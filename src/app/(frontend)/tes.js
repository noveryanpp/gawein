const buyGamepass = async (data, providedCookieId = null) => {
  console.log(`\n=== [BuyGamepass] STARTING PURCHASE PROCESS ===`);
  console.log(`[BuyGamepass] Order ID: ${data.orderId}`);
  console.log(`[BuyGamepass] Username: ${data.username}`);
  console.log(`[BuyGamepass] Gamepass ID: ${data.gamepassId}`);
  console.log(`[BuyGamepass] Product ID: ${data.productId}`);
  console.log(`[BuyGamepass] Price: ${data.price} Robux`);
  console.log(`[BuyGamepass] Seller ID: ${data.sellerId}`);
  console.log(`[BuyGamepass] Provided Cookie ID: ${providedCookieId || 'AUTO-SELECT'}`);
  console.log(`[BuyGamepass] Internal Retry: ${data.internalRetry || false}`);
  console.log(`[BuyGamepass] Process PID: ${process.pid}`);
  console.log(`[BuyGamepass] Timestamp: ${new Date().toISOString()}`);
  console.log(`=== [BuyGamepass] ===========================\n`);

  // Add service-level lock to prevent double processing
  const serviceLockKey = `service_order_lock:${data.orderId}`;
  const serviceLockValue = `${Date.now()}_${Math.random()}_${process.pid}`;

  try {
    // Try to acquire service lock first
    console.log(`[BuyGamepass] 🔒 Attempting to acquire service lock for order ${data.orderId}...`);
    const serviceLockResult = await redis.set(serviceLockKey, serviceLockValue, 'PX', 90000, 'NX');
    if (serviceLockResult !== 'OK') {
      console.log(`[BuyGamepass] ❌ Service lock already exists for order ${data.orderId}, aborting to prevent double processing`);
      console.log(`[BuyGamepass] 🔄 Another process is already handling this order`);
      return {
        success: false,
        message: 'Order already being processed by another service call'
      };
    }
    console.log(`[BuyGamepass] ✅ Service lock acquired successfully for order ${data.orderId}`);
  } catch (lockError) {
    console.error(`[BuyGamepass] ❌ Error acquiring service lock for order ${data.orderId}:`, lockError.message);
    return {
      success: false,
      message: 'Could not acquire service lock'
    };
  }

  const shouldRequeue = !data.internalRetry; // if internal retry handled by worker, suppress QUEUED flips
  const requeueUpdate = async (reason) => {
    if (!shouldRequeue) {
      console.log(`[BuyGamepass] 🔄 SkipRequeueInternalRetry - order ${data.orderId}, reason: ${reason}`);
      return;
    }
    try {
      console.log(`[BuyGamepass] 📤 Requeuing order ${data.orderId} with reason: ${reason}`);
      await prisma.orderRobuxGamepasses.update({
        where: { id: data.orderId },
        data: { status: 'QUEUED', updatedAt: new Date() }
      });
      console.log(`[BuyGamepass] ✅ Order ${data.orderId} successfully requeued -> QUEUED (${reason})`);
    } catch (e) {
      console.error(`[BuyGamepass] ❌ RequeueError for order ${data.orderId}, reason: ${reason}, error: ${e.message}`);
    }
  };

  let robuxCookie = null;

  try {
    console.log(`[BuyGamepass] 📋 Starting order validation transaction for order ${data.orderId}...`);
    const orderStatus = await prisma.$transaction(async (tx) => {
      console.log(`[BuyGamepass] 🔍 Checking order status in database...`);
      const order = await tx.orderRobuxGamepasses.findFirst({
        where: {
          id: data.orderId,
          status: {
            notIn: ['COMPLETED', 'FAILED_PERMANENT']
          }
        }
      });

      if (!order) {
        console.log(`[BuyGamepass] ❌ Order ${data.orderId} not found or already processed`);
        return {
          status: 'INVALID',
          message: 'Order already completed, permanently failed, or invalid'
        };
      }

      console.log(`[BuyGamepass] 📝 Order ${data.orderId} found with status: ${order.status}`);
      console.log(`[BuyGamepass] 🔄 Updating order status to ON_PROGRESS...`);
      await tx.orderRobuxGamepasses.update({
        where: { id: data.orderId },
        data: {
          status: 'ON_PROGRESS',
          updatedAt: new Date()
        }
      });
      console.log(`[BuyGamepass] ✅ Order ${data.orderId} status updated to ON_PROGRESS`);

      return {
        status: 'READY',
        order
      };
    });

    if (orderStatus.status !== 'READY') {
      console.log(`[BuyGamepass] ⚠️ Order ${data.orderId} validation failed: ${orderStatus.message}`);
      return {
        success: false,
        message: orderStatus.message
      };
    }
    console.log(`[BuyGamepass] ✅ Order validation completed successfully for order ${data.orderId}`);

    if (providedCookieId) {
      console.log(`[BuyGamepass] 🍪 Using provided cookie ID: ${providedCookieId} for order ${data.orderId}`);
      robuxCookie = await prisma.robloxCookies.findUnique({
        where: { id: providedCookieId }
      });

      if (!robuxCookie) {
        console.error(`[BuyGamepass] ❌ Provided cookie ${providedCookieId} not found in database for order ${data.orderId}`);
        await requeueUpdate('PROVIDED_COOKIE_NOT_FOUND');
        throw new AppError('PROVIDED_COOKIE_NOT_FOUND', 503);
      }

      if (!robuxCookie.isActive) {
        console.error(`[BuyGamepass] ❌ Provided cookie ${providedCookieId} is not active for order ${data.orderId}`);
        await requeueUpdate('PROVIDED_COOKIE_INACTIVE');
        throw new AppError('PROVIDED_COOKIE_INACTIVE', 503);
      }

      console.log(`[BuyGamepass] ✅ Using provided cookie: ${robuxCookie.aliasName || robuxCookie.id} (Robux: ${robuxCookie.robux}) for order ${data.orderId}`);
    } else {
      console.log(`[BuyGamepass] 🔍 Auto-selecting best available cookie for order ${data.orderId}...`);
      const availableCookies = await prisma.robloxCookies.findMany({
        where: {
          isActive: true,
          role: 'ROBUX',
          invalidReason: null,
          robux: { gt: 0 }
        },
        orderBy: [
          { isBusy: 'asc' },
          { lastFinishedOrder: 'asc' },
          { robux: 'desc' }
        ]
      });
      console.log(`[BuyGamepass] 📊 Found ${availableCookies.length} active ROBUX cookies with balance > 0`);

      const now = Date.now();
      const nonRateLimitedCookies = availableCookies.filter(cookie => {
        const rateLimitedUntil = rateLimitTracker.get(cookie.id);
        return !rateLimitedUntil || now > rateLimitedUntil;
      });
      console.log(`[BuyGamepass] 📊 ${nonRateLimitedCookies.length} cookies are not rate limited`);

      if (nonRateLimitedCookies.length === 0) {
        console.log(`[BuyGamepass] ⚠️ All cookies are rate limited for order ${data.orderId} - waiting for cooldown`);
        await requeueUpdate('ALL_COOKIES_RATE_LIMITED');
        const rateLimitStatus = getRateLimitStatus();
        console.log(`[BuyGamepass] 📊 Rate limit status:`, JSON.stringify(rateLimitStatus, null, 2));
        return {
          success: false,
          message: 'ALL_COOKIES_RATE_LIMITED',
          shouldRetry: true
        };
      }

      robuxCookie = nonRateLimitedCookies[0];

      if (!robuxCookie) {
        console.error(`[BuyGamepass] ❌ No available cookie found for order ${data.orderId}`);
        await requeueUpdate('NO_ROBUX_COOKIE_AVAILABLE');
        throw new AppError('NO_ROBUX_COOKIE_AVAILABLE', 503);
      }

      console.log(`[BuyGamepass] ✅ Auto-selected cookie: ${robuxCookie.aliasName || robuxCookie.id} (Robux: ${robuxCookie.robux}) for order ${data.orderId}`);
    }

    try {
      console.log(`[BuyGamepass] 🍪 Starting cookie validation and purchase process for order ${data.orderId}`);
      console.log(`[BuyGamepass] 🍪 Cookie Details: ${robuxCookie.aliasName || robuxCookie.id}, Robux: ${robuxCookie.robux}, Active: ${robuxCookie.isActive}`);

      const validateCookieWithRetry = async (cookie, maxRetries = 3) => {
        console.log(`[BuyGamepass] 🔍 Validating cookie ${cookie.aliasName || cookie.id} for order ${data.orderId}...`);

        // If global cooldown active, short-circuit
        const globalCd = await getServiceGlobalCooldown();
        if (globalCd && Date.now() < globalCd) {
          console.log(`[BuyGamepass] ⏰ Global cooldown active until ${new Date(globalCd).toISOString()}, skipping validation for order ${data.orderId}`);
          throw new AppError('GLOBAL_RATE_LIMIT_ACTIVE', 503);
        }

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`[BuyGamepass] 🔐 Cookie validation attempt ${attempt}/${maxRetries} for ${cookie.aliasName || cookie.id}`);
            await noblox.setCookie(cookie.cookie);
            // Use getAuthenticatedUser() to avoid deprecated warning
            const cookieUser = await noblox.getAuthenticatedUser();
            const freshRobux = await noblox.getUserFunds(cookieUser.id);
            console.log(`[BuyGamepass] ✅ Cookie validation successful (attempt ${attempt}): ${freshRobux} robux for ${cookie.aliasName || cookie.id}`);
            console.log(`[BuyGamepass] 👤 Cookie User: ${cookieUser.name} (ID: ${cookieUser.id})`);
            return { isValid: true, userId: cookieUser.id, username: cookieUser.name, robux: freshRobux };
          } catch (error) {
            const emsg = error.message || '';
            const isRate = emsg.includes('429') || emsg.toLowerCase().includes('rate') || error?.response?.status === 429;
            console.error(`[BuyGamepass] ❌ Cookie validation failed (attempt ${attempt}) for ${cookie.aliasName || cookie.id}: ${emsg}`);

            if (isRate) {
              // Set per-cookie cooldown
              rateLimitTracker.set(cookie.id, Date.now() + RATE_LIMIT_DELAY);
              // Set a global cooldown once (e.g., 60s)
              await setServiceGlobalCooldown(60000);
              console.log(`[BuyGamepass] ⏰ Rate limit detected - set cookie + global cooldown (60s) for order ${data.orderId}`);
              await requeueUpdate('RATE_LIMITED_COOLDOWN_SET');
              throw new AppError('RATE_LIMITED_COOLDOWN_SET', 503);
            }
            if (emsg.includes('The user is invalid') || emsg.includes('Invalid cookie') || emsg.includes('Token Validation Failed') || error.response?.status === 401 || error.response?.status === 403) {
              console.error(`[BuyGamepass] 🚫 Cookie ${cookie.aliasName || cookie.id} invalid - marking as inactive`);
              if (cookie.id) {
                try {
                  await prisma.robloxCookies.update({
                    where:{ id: cookie.id },
                    data:{ isActive:false, invalidReason: 'Cookie validation failed - invalid token' }
                  });
                  console.log(`[BuyGamepass] 📝 Cookie ${cookie.aliasName || cookie.id} marked as inactive in database`);
                } catch {}
              }
              await requeueUpdate('INVALID_COOKIE');
              throw new AppError('INVALID_COOKIE', 503);
            }
            if (attempt < maxRetries) {
              console.log(`[BuyGamepass] 🔄 Transient error, retrying validation (attempt ${attempt}/${maxRetries}) in 5 seconds...`);
              await new Promise(r => setTimeout(r, 5000));
              continue;
            }
            throw error;
          }
        }
      };

      let validationResult;
      try {
        validationResult = await validateCookieWithRetry(robuxCookie);
        console.log(`[BuyGamepass] API validation successful: ${validationResult.robux} robux for order ${data.orderId}`);

        if (robuxCookie && robuxCookie.id) {
          try {
            await prisma.robloxCookies.update({
              where: { id: robuxCookie.id },
              data: {
                robux: validationResult.robux,
                userId: validationResult.userId?.toString(),
                username: validationResult.username
              }
            });
          } catch (updateError) {
            console.error('[BuyGamepass] Failed to update cookie with fresh robux:', updateError.message);
          }
        }
      } catch (error) {
        console.error('[BuyGamepass] API validation failed, using database value:', error.message);

        if (error.message.includes('INVALID_COOKIE') ||
          error.message.includes('RATE_LIMITED_MAX_RETRIES')) {
          await requeueUpdate(error.message);
          throw error;
        }

        validationResult = {
          isValid: true,
          userId: robuxCookie.userId,
          username: robuxCookie.username,
          robux: robuxCookie.robux || 0
        };

        console.log(`[BuyGamepass] Using database robux value: ${validationResult.robux} for order ${data.orderId}`);
      }

      const currentRobux = validationResult.robux;
      console.log(`[BuyGamepass] 💰 Current Robux Balance: ${currentRobux}, Required: ${data.price} for order ${data.orderId}`);

      if (currentRobux === 0) {
        console.error(`[BuyGamepass] ❌ Cookie has 0 robux - marking as inactive for order ${data.orderId}`);

        if (robuxCookie && robuxCookie.id) {
          try {
            await prisma.robloxCookies.update({
              where: { id: robuxCookie.id },
              data: {
                isActive: false,
                invalidReason: 'Cookie has 0 robux'
              }
            });
            console.log(`[BuyGamepass] 📝 Cookie ${robuxCookie.aliasName || robuxCookie.id} marked as inactive due to 0 robux`);
          } catch (updateError) {
            console.error('[BuyGamepass] ❌ Failed to update cookie:', updateError.message);
          }
        }

        await requeueUpdate('COOKIE_ZERO_ROBUX');
        throw new AppError('INSUFFICIENT_ROBUX', 503);
      }

      console.log(`[BuyGamepass] 🔐 Setting Roblox cookie for purchase...`);
      await noblox.setCookie(robuxCookie.cookie);

      if (currentRobux < data.price) {
        console.log(`[BuyGamepass] ❌ Insufficient robux: ${currentRobux} < ${data.price} for order ${data.orderId}`);
        await requeueUpdate('INSUFFICIENT_ROBUX');
        throw new AppError('INSUFFICIENT_ROBUX', 503);
      }

      console.log(`[BuyGamepass] ✅ Robux validation passed, starting purchase process for order ${data.orderId}`);
      console.log(`[BuyGamepass] 🛒 Purchase Details: ProductId=${data.productId}, Price=${data.price}, SellerId=${data.sellerId}`);

      const getCSRFWithRetry = async (maxRetries = 3) => {
        console.log(`[BuyGamepass] 🔑 Getting CSRF token for order ${data.orderId}...`);
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`[BuyGamepass] 🔑 CSRF attempt ${attempt}/${maxRetries}`);
            const csrfResponse = await axios({
              url: 'https://auth.roblox.com/v2/logout',
              method: 'POST',
              headers: {
                'Cookie': `.ROBLOSECURITY=${robuxCookie.cookie}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              },
              validateStatus: () => true
            });

            const xcsrf = csrfResponse.headers['x-csrf-token'];

            if (xcsrf) {
              console.log(`[BuyGamepass] ✅ CSRF token obtained successfully (attempt ${attempt}) for order ${data.orderId}: ${xcsrf.substring(0, 20)}...`);
              return xcsrf;
            }

            if (csrfResponse.status === 429 || csrfResponse.status === 403) {
              console.log(`[BuyGamepass] ⏰ Rate limit detected during CSRF (${csrfResponse.status}) - marking cookie for cooldown`);
              rateLimitTracker.set(robuxCookie.id, Date.now() + RATE_LIMIT_DELAY);
              await requeueUpdate('CSRF_RATE_LIMITED_COOLDOWN_SET');
              throw new AppError('CSRF_RATE_LIMITED_COOLDOWN_SET', 503);
            }

            throw new Error('No CSRF token in response');
          } catch (error) {
            console.error(`[BuyGamepass] ❌ CSRF token request failed (attempt ${attempt}) for order ${data.orderId}: ${error.message}`);

            if (error.response?.status === 429 || error.response?.status === 403 || error.message.includes('429')) {
              console.log(`[BuyGamepass] ⏰ Rate limit detected during CSRF - marking cookie for cooldown`);
              rateLimitTracker.set(robuxCookie.id, Date.now() + RATE_LIMIT_DELAY);
              await requeueUpdate('CSRF_RATE_LIMITED_COOLDOWN_SET');
              throw new AppError('CSRF_RATE_LIMITED_COOLDOWN_SET', 503);
            }

            if (attempt < maxRetries) {
              console.log(`[BuyGamepass] 🔄 Retrying CSRF after error (attempt ${attempt}/${maxRetries}) in 5 seconds...`);
              await new Promise(resolve => setTimeout(resolve, 5000));
              continue;
            }

            throw error;
          }
        }
      };

      const xcsrf = await getCSRFWithRetry();

      if (!xcsrf) {
        console.error(`[BuyGamepass] Failed to get CSRF token for order ${data.orderId}`);
        await requeueUpdate('TOKEN_VALIDATION_FAILED');
        throw new AppError('TOKEN_VALIDATION_FAILED', 503);
      }

      const purchaseWithRetry = async (maxRetries = 3) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`[BuyGamepass] Purchase attempt ${attempt}/${maxRetries} for order ${data.orderId}`);

            const purchaseResponse = await axios({
              url: `https://economy.roblox.com/v1/purchases/products/${data.productId}`,
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN': xcsrf,
                'Content-Type': 'application/json',
                'Cookie': `.ROBLOSECURITY=${robuxCookie.cookie}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              },
              data: {
                expectedCurrency: 1,
                expectedPrice: data.price,
                expectedSellerId: data.sellerId
              },
              timeout: 30000
            });

            console.log(`[BuyGamepass] Purchase attempt ${attempt} completed for order ${data.orderId}`);
            return purchaseResponse;
          } catch (error) {
            console.error(`[BuyGamepass] Purchase attempt ${attempt} failed for order ${data.orderId}: ${error.message}`);
            console.error(`[BuyGamepass] Error status: ${error.response?.status}, Error data:`, error.response?.data);

            if (error.response?.status === 403) {
              console.log(`[BuyGamepass] 403 Forbidden detected - marking cookie for 1 minute cooldown`);
              if (error.response?.data?.errors.some(error => error.message === 'Challenge is required to authorize the request')) {
                console.log(`[BuyGamepass] Challenge required - trying to get challengeId`);
                const headers = error.response?.headers || null;
                if (!headers) {
                  console.error(`[BuyGamepass] No headers found in response`);
                } else {
                  console.log(`[BuyGamepass] Headers found, getting challenge metadata`);
                  const challengeId = headers['Rblx-Challenge-Id'];
                  const code = authenticator.generate(robuxCookie.secret);
                  if (challengeId) {
                    console.log(`[BuyGamepass] Challenge ID found: ${challengeId}, trying to solve challenge with code ${code}`);
                    try {
                      const challengeResponse = await axios({
                        url: `https://twostepverification.roblox.com/v1/users/${robuxCookie.userId}/challenges/recovery-codes/verify`,
                        method: 'POST',
                        headers: {
                          'X-CSRF-TOKEN': xcsrf,
                          'Content-Type': 'application/json',
                          'Cookie': `.ROBLOSECURITY=${robuxCookie.cookie}`,
                          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                        },
                        data: {
                          "challengeId": challengeId,
                          "actionType": 2,
                          "code": code
                        },
                        timeout: 30000
                      });
                      if (challengeResponse.status === 200) {
                        console.log(`[BuyGamepass] Challenge solved, verification token: ${challengeResponse.data.verificationToken}`);
                      } else {
                        console.error(`[BuyGamepass] Challenge solving failed, status: ${challengeResponse.status}, data:`, challengeResponse.data);
                      }
                    } catch (error) {
                      console.error(`[BuyGamepass] Challenge solving failed, status: ${error?.response?.status}, data:`, error?.response?.data);
                    }
                  } else {
                    console.error(`[BuyGamepass] No challenge ID found in headers`);
                  }
                }
                console.log(`[BuyGamepass] Retrying purchase in a minute`);
              }
              rateLimitTracker.set(robuxCookie.id, Date.now() + RATE_LIMIT_DELAY);
              await requeueUpdate('PURCHASE_FORBIDDEN_COOLDOWN_SET');
              throw new AppError('PURCHASE_FORBIDDEN_COOLDOWN_SET', 503);
            }

            if (error.response?.status === 429 || error.message.includes('429')) {
              console.log(`[BuyGamepass] Rate limit detected during purchase - marking cookie for cooldown`);
              rateLimitTracker.set(robuxCookie.id, Date.now() + RATE_LIMIT_DELAY);
              await requeueUpdate('PURCHASE_RATE_LIMITED_COOLDOWN_SET');
              throw new AppError('PURCHASE_RATE_LIMITED_COOLDOWN_SET', 503);
            }

            if (error.response?.status >= 400 && error.response?.status < 500) {
              console.log(`[BuyGamepass] Client error ${error.response.status} - will retry later`);
              await requeueUpdate(`CLIENT_ERROR_${error.response.status}`);
              throw new AppError(`CLIENT_ERROR_${error.response.status}`, 503);
            }

            if (attempt < maxRetries) {
              console.log(`[BuyGamepass] Retrying purchase after error (attempt ${attempt}/${maxRetries})`);
              await new Promise(resolve => setTimeout(resolve, 5000));
              continue;
            }

            throw error;
          }
        }
      };

      const purchaseResponse = await purchaseWithRetry();

      if (!purchaseResponse.data.purchased) {
        console.log(`[BuyGamepass] Purchase failed for order ${data.orderId}: ${purchaseResponse.data.errorMsg}`);

        if (purchaseResponse.data.reason === 'AlreadyOwned') {
          console.log(`[BuyGamepass] Attempting to revoke gamepass for order ${data.orderId}`);

          try {
            const revokeSuccess = await revokeGamepass({
              gamepassId: data.gamepassId,
              username: data.username
            }, robuxCookie, xcsrf);

            if (revokeSuccess) {
              console.log(`[BuyGamepass] Gamepass revoked successfully for order ${data.orderId}, retrying purchase`);

              const retryPurchaseResponse = await axios({
                url: `https://economy.roblox.com/v1/purchases/products/${data.productId}`,
                method: 'POST',
                headers: {
                  'X-CSRF-TOKEN': xcsrf,
                  'Content-Type': 'application/json',
                  'Cookie': `.ROBLOSECURITY=${robuxCookie.cookie}`,
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                data: {
                  expectedCurrency: 1,
                  expectedPrice: data.price,
                  expectedSellerId: data.sellerId
                },
                timeout: 30000
              });

              if (retryPurchaseResponse.data.purchased) {
                console.log(`[BuyGamepass] Retry purchase successful after revoke for order ${data.orderId}! 🎉`);

                // Calculate robux properly after successful retry purchase
                let newRobux = Math.max(0, currentRobux - data.price);
                console.log(`[BuyGamepass] Calculated robux after retry purchase: ${currentRobux} - ${data.price} = ${newRobux} for order ${data.orderId}`);

                // Update order status and cookie robux atomically
                await prisma.$transaction(async (tx) => {
                  // Double-check order status before final update
                  const currentOrder = await tx.orderRobuxGamepasses.findUnique({
                    where: { id: data.orderId },
                    select: { status: true }
                  });

                  if (currentOrder?.status === 'COMPLETED') {
                    console.log(`[BuyGamepass] Order ${data.orderId} already completed during retry transaction, skipping update`);
                    return;
                  }

                  // Update order to completed
                  await tx.orderRobuxGamepasses.update({
                    where: { id: data.orderId },
                    data: {
                      status: 'COMPLETED',
                      processedAt: new Date(),
                      updatedAt: new Date()
                    }
                  });

                  // Update cookie robux
                  if (robuxCookie && robuxCookie.id) {
                    await tx.robloxCookies.update({
                      where: { id: robuxCookie.id },
                      data: {
                        lastFinishedOrder: new Date(),
                        robux: newRobux
                      }
                    });
                    console.log(`[BuyGamepass] Cookie ${robuxCookie.id} robux updated after retry: ${currentRobux} -> ${newRobux} for order ${data.orderId}`);
                  }
                });

                return {
                  success: true,
                  message: 'Gamepass purchased successfully after revoke',
                  data: {
                    purchase: retryPurchaseResponse.data,
                    remainingRobux: newRobux
                  }
                };
              } else {
                console.log(`[BuyGamepass] Retry purchase failed after revoke for order ${data.orderId}: ${retryPurchaseResponse.data.errorMsg}`);
                if (retryPurchaseResponse.data.errorMsg &&
                  (retryPurchaseResponse.data.errorMsg.includes('not for sale') ||
                    retryPurchaseResponse.data.errorMsg.includes('no longer available') ||
                    retryPurchaseResponse.data.errorMsg.includes('item is not available') ||
                    retryPurchaseResponse.data.errorMsg.includes('This item is currently not for sale') ||
                    retryPurchaseResponse.data.errorMsg.includes('NotForSale') ||
                    retryPurchaseResponse.data.reason === 'NotForSale')) {

                  console.log(`[BuyGamepass] Item not for sale in retry for order ${data.orderId} - setting to FAILED_PERMANENT`);

                  await prisma.orderRobuxGamepasses.update({
                    where: { id: data.orderId },
                    data: {
                      status: 'FAILED_PERMANENT',
                      updatedAt: new Date()
                    }
                  });

                  throw new AppError(`Item not for sale - order marked as permanently failed`, 400);
                }
              }
            } else {
              console.log(`[BuyGamepass] Failed to revoke gamepass for order ${data.orderId} - will retry order`);
            }
          } catch (revokeError) {
            console.error(`[BuyGamepass] Error during revoke process for order ${data.orderId}:`, revokeError.message);
          }

          console.log(`[BuyGamepass] Adding order ${data.orderId} back to queue - will retry indefinitely`);

          await requeueUpdate('ALREADY_OWNED_RETRY_AFTER_REVOKE');
          throw new AppError(`AlreadyOwned - revoke failed, order will be retried`, 503);
        }

        if (purchaseResponse.data.errorMsg &&
          (purchaseResponse.data.errorMsg.includes('changed price') ||
            purchaseResponse.data.errorMsg.includes('This item has changed price') ||
            purchaseResponse.data.errorMsg.includes('Please try again'))) {

          console.log(`[BuyGamepass] Price changed error for order ${data.orderId} - setting to FAILED_PERMANENT`);

          await prisma.orderRobuxGamepasses.update({
            where: { id: data.orderId },
            data: {
              status: 'FAILED_PERMANENT',
              updatedAt: new Date()
            }
          });

          throw new AppError(`Price changed - order marked as permanently failed`, 400);
        }

        if (purchaseResponse.data.errorMsg &&
          (purchaseResponse.data.errorMsg.includes('not for sale') ||
            purchaseResponse.data.errorMsg.includes('no longer available') ||
            purchaseResponse.data.errorMsg.includes('item is not available') ||
            purchaseResponse.data.errorMsg.includes('This item is currently not for sale') ||
            purchaseResponse.data.errorMsg.includes('NotForSale') ||
            purchaseResponse.data.reason === 'NotForSale')) {

          console.log(`[BuyGamepass] Item not for sale error for order ${data.orderId} - setting to FAILED_PERMANENT`);

          await prisma.orderRobuxGamepasses.update({
            where: { id: data.orderId },
            data: {
              status: 'FAILED_PERMANENT',
              updatedAt: new Date()
            }
          });

          throw new AppError(`Item not for sale - order marked as permanently failed`, 400);
        }

        if (purchaseResponse.data.errorMsg &&
          (purchaseResponse.data.errorMsg.includes('item is unavailable') ||
            purchaseResponse.data.errorMsg.includes('item has been removed') ||
            purchaseResponse.data.errorMsg.includes('item no longer exists'))) {

          console.log(`[BuyGamepass] Item unavailable error for order ${data.orderId} - setting to FAILED_PERMANENT`);

          await prisma.orderRobuxGamepasses.update({
            where: { id: data.orderId },
            data: {
              status: 'FAILED_PERMANENT',
              updatedAt: new Date()
            }
          });

          throw new AppError(`Item unavailable - order marked as permanently failed`, 400);
        }

        console.log(`[BuyGamepass] Adding order ${data.orderId} back to queue due to purchase failure`);
        await requeueUpdate('PURCHASE_FAILED');
        throw new AppError(purchaseResponse.data.errorMsg || 'Purchase failed - will retry', 503);
      }

      console.log(`[BuyGamepass] 🛒 Starting actual purchase process for order ${data.orderId}! 🎉`);

      // Calculate robux properly after successful purchase
      let newRobux = Math.max(0, currentRobux - data.price);
      console.log(`[BuyGamepass] 💰 Calculated robux after purchase: ${currentRobux} - ${data.price} = ${newRobux} for order ${data.orderId}`);

      console.log(`[BuyGamepass] 💾 Starting atomic transaction to update order and cookie...`);
      // Update order status and cookie robux atomically to prevent race conditions
      await prisma.$transaction(async (tx) => {
        console.log(`[BuyGamepass] 🔍 Double-checking order status before final update...`);
        // Double-check order status before final update
        const currentOrder = await tx.orderRobuxGamepasses.findUnique({
          where: { id: data.orderId },
          select: { status: true }
        });

        if (currentOrder?.status === 'COMPLETED') {
          console.log(`[BuyGamepass] ⚠️ Order ${data.orderId} already completed during transaction, skipping update`);
          return;
        }

        console.log(`[BuyGamepass] ✅ Updating order ${data.orderId} to COMPLETED status...`);
        // Update order to completed
        await tx.orderRobuxGamepasses.update({
          where: { id: data.orderId },
          data: {
            status: 'COMPLETED',
            processedAt: new Date(),
            updatedAt: new Date()
          }
        });

        // Update cookie robux
        if (robuxCookie && robuxCookie.id) {
          console.log(`[BuyGamepass] 💰 Updating cookie ${robuxCookie.aliasName || robuxCookie.id} robux balance...`);
          await tx.robloxCookies.update({
            where: { id: robuxCookie.id },
            data: {
              lastFinishedOrder: new Date(),
              robux: newRobux,
              userId: validationResult.userId?.toString(),
              username: validationResult.username
            }
          });
          console.log(`[BuyGamepass] ✅ Cookie ${robuxCookie.id} robux updated: ${currentRobux} -> ${newRobux} for order ${data.orderId}`);
        }
      });

      console.log(`\n=== [BuyGamepass] PURCHASE COMPLETED SUCCESSFULLY ===`);
      console.log(`[BuyGamepass] Order ID: ${data.orderId} ✅`);
      console.log(`[BuyGamepass] Username: ${data.username}`);
      console.log(`[BuyGamepass] Gamepass ID: ${data.gamepassId}`);
      console.log(`[BuyGamepass] Price Paid: ${data.price} Robux`);
      console.log(`[BuyGamepass] Cookie Used: ${robuxCookie.aliasName || robuxCookie.id}`);
      console.log(`[BuyGamepass] Remaining Robux: ${newRobux}`);
      console.log(`[BuyGamepass] Process Time: ${new Date().toISOString()}`);
      console.log(`=== [BuyGamepass] ============================\n`);

      return {
        success: true,
        message: 'Gamepass purchased successfully',
        data: {
          purchase: purchaseResponse.data,
          remainingRobux: newRobux
        }
      };

    } catch (error) {
      console.error(`\n=== [BuyGamepass] PURCHASE PROCESS ERROR ===`);
      console.error(`[BuyGamepass] Order ID: ${data.orderId}`);
      console.error(`[BuyGamepass] Error: ${error.message}`);
      console.error(`[BuyGamepass] Error Type: ${error.constructor.name}`);
      console.error(`[BuyGamepass] Process PID: ${process.pid}`);
      console.error(`[BuyGamepass] Timestamp: ${new Date().toISOString()}`);
      console.error(`=== [BuyGamepass] ========================\n`);

      if (error.message.includes('not for sale') ||
        error.message.includes('no longer available') ||
        error.message.includes('item is not available') ||
        error.message.includes('This item is currently not for sale') ||
        error.message.includes('item is unavailable') ||
        error.message.includes('item has been removed') ||
        error.message.includes('item no longer exists') ||
        error.message.includes('changed price') ||
        error.message.includes('Price changed') ||
        error.message.includes('NotForSale')) {

        console.log(`[BuyGamepass] 🚫 Permanent failure detected for order ${data.orderId} - setting to FAILED_PERMANENT`);

        try {
          await prisma.orderRobuxGamepasses.update({
            where: { id: data.orderId },
            data: {
              status: 'FAILED_PERMANENT',
              updatedAt: new Date()
            }
          });
          console.log(`[BuyGamepass] ✅ Order ${data.orderId} marked as FAILED_PERMANENT`);
        } catch (dbError) {
          console.error(`[BuyGamepass] ❌ Failed to update order to FAILED_PERMANENT for order ${data.orderId}: ${dbError.message}`);
        }

        throw error;
      }

      console.log(`[BuyGamepass] 🔄 Setting order ${data.orderId} back to QUEUED for retry`);
      if (error.message.includes('COOLDOWN_SET') || error.message.includes('FORBIDDEN')) {
        console.log(`[BuyGamepass] ⏰ Cookie ${robuxCookie?.id} marked for cooldown due to rate limit`);
      }
      if (robuxCookie && robuxCookie.id && !error.message.includes('NO_ROBUX_COOKIE_AVAILABLE')) {
        try {
          await prisma.robloxCookies.update({
            where: { id: robuxCookie.id },
            data: { invalidReason: error.message.includes('COOLDOWN_SET') ? 'Rate limited - cooling down' : error.message }
          });
          console.log(`[BuyGamepass] 📝 Cookie ${robuxCookie.aliasName || robuxCookie.id} invalidReason updated`);
        } catch (dbError) {
          console.error(`[BuyGamepass] ❌ Failed to update cookie invalidReason for order ${data.orderId}: ${dbError.message}`);
        }
      }
      try {
        const currentOrder = await prisma.orderRobuxGamepasses.findUnique({ where: { id: data.orderId }, select: { status: true } });
        if (currentOrder && currentOrder.status !== 'COMPLETED' && currentOrder.status !== 'FAILED_PERMANENT') {
          await requeueUpdate('PURCHASE_PROCESS_ERROR');
          console.log(`[BuyGamepass] 🔄 Order ${data.orderId} requeued due to purchase process error`);
        }
      } catch (dbError) {
        console.error(`[BuyGamepass] ❌ Failed to reset order status for order ${data.orderId}: ${dbError.message}`);
      }
      throw error;
    }
  } catch (error) {
    console.error(`\n=== [BuyGamepass] FATAL ERROR ===`);
    console.error(`[BuyGamepass] Order ID: ${data.orderId}`);
    console.error(`[BuyGamepass] Fatal Error: ${error.message}`);
    console.error(`[BuyGamepass] Error Status: ${error.status}`);
    console.error(`[BuyGamepass] Process PID: ${process.pid}`);
    console.error(`[BuyGamepass] Timestamp: ${new Date().toISOString()}`);
    console.error(`=== [BuyGamepass] ===============\n`);

    try {
      const currentOrder = await prisma.orderRobuxGamepasses.findUnique({ where: { id: data.orderId }, select: { status: true } });
      if (currentOrder && currentOrder.status !== 'COMPLETED' && currentOrder.status !== 'FAILED_PERMANENT') {
        await requeueUpdate('GENERAL_ERROR');
        console.log(`[BuyGamepass] 🔄 Order ${data.orderId} reset to QUEUED due to fatal error`);
      }
    } catch (dbError) {
      console.error(`[BuyGamepass] ❌ Failed to reset order status for order ${data.orderId}: ${dbError.message}`);
    }
    if (error instanceof AppError) { throw error; }
    throw new AppError('Purchase failed - will retry automatically', 503);
  } finally {
    console.log(`[BuyGamepass] 🔓 Releasing service lock for order ${data.orderId}...`);
    // Always release service lock
    try {
      const script = `
                if redis.call("get", KEYS[1]) == ARGV[1] then
                    return redis.call("del", KEYS[1])
                else
                    return 0
                end
            `;
      await redis.eval(script, 1, serviceLockKey, serviceLockValue);
      console.log(`[BuyGamepass] ✅ Service lock released successfully for order ${data.orderId}`);
    } catch (releaseLockError) {
      console.error(`[BuyGamepass] ❌ Error releasing service lock for order ${data.orderId}: ${releaseLockError.message}`);
    }
    console.log(`[BuyGamepass] 🏁 Process completed for order ${data.orderId} at ${new Date().toISOString()}\n`);
  }
};