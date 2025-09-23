import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import RichText from '@/components/RichText'
import type { SimplifiedService } from '@/lib/payload'

interface ServicesContentProps {
  services: SimplifiedService[]
}

export const ServicesContent = ({ services }: ServicesContentProps) => {
  const sortedServices = services.sort((a, b) => a.order - b.order)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Layanan Kami
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Solusi Digital{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Terpercaya
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dari website hingga aplikasi mobile, kami menyediakan layanan pengembangan teknologi
            yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {sortedServices.map((service, index) => (
              <div key={service.id} id={service.slug} className="relative">
                <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl p-8 lg:p-12 shadow-lg">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white text-lg font-bold rounded-xl">
                            {index + 1}
                          </span>
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            {service.title}
                          </h2>
                        </div>

                        {service.description && (
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {service.description}
                          </p>
                        )}

                        {service.content && (
                          <div className="prose prose-lg max-w-none">
                            <RichText content={service.content} />
                          </div>
                        )}

                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.features.map((featureItem, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 font-medium">
                                  {featureItem.feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="pt-6">
                          <Link href={service.ctaLink || '/contact'}>
                            <Button
                              variant="primary"
                              size="lg"
                              className="group"
                            >
                              {service.ctaText || 'Konsultasi Gratis'}
                              <svg
                                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#2EBEFA]/20 to-[#0057B8]/20 rounded-3xl blur-2xl"></div>
                        <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                          {service.image ? (
                            <Image
                              src={service.image.url}
                              alt={service.image.alt}
                              width={600}
                              height={400}
                              className="w-full h-64 lg:h-80 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-xl flex items-center justify-center">
                              <span className="text-gray-500">No image available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#2EBEFA] to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Siap Memulai Proyek Digital Anda?
          </h2>
          <p className="text-lg text-[#E6F2FF] max-w-2xl mx-auto mb-8">
            Konsultasi gratis untuk menentukan solusi terbaik sesuai kebutuhan bisnis Anda.
            Tim ahli kami siap membantu mewujudkan visi digital Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/contact'} >
              <Button
                variant="secondary"
                size="lg"
                className="group cursor-pointer"
              >
                Konsultasi Gratis
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href={'/portfolio'} >
              <Button
                variant="outline"
                size="lg"
                className="group cursor-pointer border-white/30 text-white hover:bg-white hover:text-[#0057B8]"
              >
                Lihat Portfolio
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
