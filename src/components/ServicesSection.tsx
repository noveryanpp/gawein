'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import type { SimplifiedService } from '@/lib/payload'
import Link from 'next/link'

interface ServicesSectionProps {
  services: SimplifiedService[]
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-4">
            Layanan Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Solusi Digital{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Terlengkap
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dari konsep hingga deployment, kami menyediakan layanan teknologi komprehensif untuk
            mengembangkan bisnis digital kamu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} href={'/services#' + service.slug} >
              <div
                className="group cursor-pointer bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 mr-4">
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2EBEFA] transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3">
                    {service.features.map((featureItem, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg
                          className="w-4 h-4 text-[#2EBEFA] mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {featureItem.feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Punya proyek dalam pikiran? Mari diskusikan solusi terbaik untuk bisnismu.
          </p>
          <Link href={'/contact'}>
            <Button size="lg">Konsultasi Gratis</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
