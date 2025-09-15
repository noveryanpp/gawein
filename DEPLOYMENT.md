# gawein - Deployment Guide

A comprehensive deployment tutorial for your Next.js 15 application with PayloadCMS 3.0 and TailwindCSS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Production Deployment](#production-deployment)
- [PM2 Deployment](#pm2-deployment)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables-reference)
- [Post-Deployment Steps](#post-deployment-steps)

## Prerequisites

Before deploying, ensure you have:

- Node.js 22.x or higher
- npm, pnpm, or yarn package manager
- Git for version control
- Database access (SQLite for development, PostgreSQL/MySQL for production)

## Environment Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd gawein
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Create environment file:**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URI=your_database_connection_string
   
   # PayloadCMS
   PAYLOAD_SECRET=your-super-secret-key-here
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
   
   # Next.js
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   
   # Optional: For production
   NODE_ENV=development
   ```

## Local Development

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

3. **Create your first admin user:**
   - Navigate to `/admin`
   - Fill in the registration form
   - Complete the setup process

## Troubleshooting Common Issues

### React Version Mismatch Error

If you encounter React version mismatch errors:

```bash
npm install react@19.1.1 react-dom@19.1.1 --save-exact
```

### TailwindCSS PostCSS Plugin Error

If you see TailwindCSS PostCSS errors, ensure you have the correct PostCSS configuration:

1. Install the required package:
   ```bash
   npm install @tailwindcss/postcss
   ```

2. Update your `postcss.config.js`:
   ```javascript
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   }
   ```

### Module Resolution Issues

If you encounter module resolution errors:

1. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### ES Module Issues

If you encounter ES module scope errors, ensure your `package.json` has:
```json
{
  "type": "module"
}
```

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Environment Variables for Production

Update your `.env.production`:
```env
DATABASE_URI=your_production_database_url
PAYLOAD_SECRET=your-super-secret-production-key
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_PAYLOAD_URL=https://yourdomain.com
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NODE_ENV=production
```

### 3. Start Production Server

```bash
npm start
```

## PM2 Deployment

PM2 is a production process manager for Node.js applications that provides features like auto-restart, load balancing, and monitoring.

### 1. Install PM2

```bash
# Install PM2 globally
npm install -g pm2
```

### 2. Create PM2 Configuration

Create a `ecosystem.config.js` file in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'gawein',
    script: 'npm',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URI: 'your_production_database_url',
      PAYLOAD_SECRET: 'your-super-secret-production-key',
      PAYLOAD_PUBLIC_SERVER_URL: 'https://yourdomain.com',
      NEXT_PUBLIC_PAYLOAD_URL: 'https://yourdomain.com',
      NEXT_PUBLIC_SERVER_URL: 'https://yourdomain.com'
    }
  }]
};
```

### 3. Deploy with PM2

```bash
# Build the application
npm run build

# Start the application with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### 4. PM2 Management Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs gawein

# Restart application
pm2 restart gawein

# Stop application
pm2 stop gawein

# Delete application from PM2
pm2 delete gawein

# Monitor applications
pm2 monit

# Reload application (zero-downtime)
pm2 reload gawein
```

### 5. Nginx Configuration (Optional)

If you want to use Nginx as a reverse proxy:

Create `/etc/nginx/sites-available/gawein`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/gawein /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL with Certbot (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

## Database Setup

### SQLite (Development)
Already configured with `gawein.db` file.

### PostgreSQL (Production)
```env
DATABASE_URI=postgresql://username:password@host:port/database
```

### MySQL (Production)
```env
DATABASE_URI=mysql://username:password@host:port/database
```

## Post-Deployment Steps

1. **Verify the deployment:**
   - Check if the frontend loads correctly
   - Access the admin panel at `/admin`
   - Test API endpoints

2. **Create admin user:**
   - Navigate to `/admin`
   - Complete the registration process

3. **Upload test content:**
   - Add some media files
   - Create test article posts
   - Verify functionality

4. **Set up monitoring:**
   - Configure error logging
   - Set up uptime monitoring
   - Configure backup strategies

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | Database connection string | Yes |
| `PAYLOAD_SECRET` | Secret key for PayloadCMS | Yes |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public URL for PayloadCMS | Yes |
| `NEXT_PUBLIC_PAYLOAD_URL` | Public PayloadCMS URL for frontend | Yes |
| `NODE_ENV` | Environment mode | Yes |

## Common Deployment Issues

### Issue: "Module not found: Can't resolve 'tailwindcss/base'"

**Solution:**
```bash
npm install @tailwindcss/postcss
```

### Issue: React version mismatch

**Solution:**
```bash
npm install react@19.1.1 react-dom@19.1.1 --save-exact
```

### Issue: ES module scope errors

**Solution:** Ensure your `package.json` has `"type": "module"`

### Issue: Build fails on deployment

**Solution:** 
1. Increase Node.js memory limit
2. Use the build script with proper Node options:
   ```bash
   NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" npm run build
   ```

### Issue: PM2 application not starting

**Solution:**
1. Check PM2 logs: `pm2 logs gawein`
2. Verify environment variables in `ecosystem.config.js`
3. Ensure the build process completed successfully
4. Check if the port is already in use

## Support

If you encounter any issues during deployment:

1. Check the console logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure all dependencies are properly installed
4. Check Node.js version compatibility
5. Use `pm2 logs` to debug PM2-specific issues

For additional support, refer to:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [PayloadCMS Deployment Guide](https://payloadcms.com/docs/production/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [TailwindCSS Installation Guide](https://tailwindcss.com/docs/installation)

---

**Note:** This deployment guide focuses on PM2 for process management, which is ideal for VPS and dedicated server deployments.
