'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Pengembangan Website",
      description: "Website dan aplikasi web custom dengan framework modern seperti React, Next.js, dan Node.js untuk performa maksimal.",
      features: ["Desain Responsif", "Optimasi SEO", "Muat Cepat", "Aman & Skalabel"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Pengembangan Software",
      description: "Solusi software tingkat perusahaan yang disesuaikan dengan kebutuhan bisnismu, mulai dari aplikasi desktop hingga sistem berbasis cloud.",
      features: ["Solusi Kustom", "Integrasi API", "Desain Database", "Deploy ke Cloud"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and engaging experiences, combining aesthetic appeal with functional usability.",
      features: ["User Research", "Prototyping", "Visual Design", "Usability Testing"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android.",
      features: ["Native Development", "Cross-platform", "App Store Optimization", "Push Notifications"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Digital Strategy",
      description: "Comprehensive digital transformation strategies that align technology solutions with your business objectives.",
      features: ["Business Analysis", "Technology Consulting", "Digital Transformation", "Process Optimization"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Maintenance & Support",
      description: "Ongoing technical support and maintenance services to ensure your applications stay secure, updated, and performing optimally.",
      features: ["24/7 Support", "Security Updates", "Performance Monitoring", "Bug Fixes"]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50 relative overflow-hidden">
      
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#1E90FF]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-bl from-[#0057B8]/15 to-[#1E90FF]/15 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Solusi Teknologi
            <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent"> Terlengkap</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mulai dari ide hingga peluncuran, kami siap membantu bisnis kamu berkembang di dunia digital dengan layanan teknologi yang menyeluruh dan terpercaya.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-[#FAFAFA] hover:to-[#E6F2FF]/50"
            >
              
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>

              
              <Button size="sm" variant="outline" className="w-full group-hover:bg-[#1E90FF] group-hover:text-white group-hover:border-[#1E90FF]">
                Selengkapnya
              </Button>

              
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF]/5 to-[#0057B8]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary">
              Konsultasi Gratis
            </Button>
            <Button size="lg" variant="secondary">
              Lihat Portofolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
