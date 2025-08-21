'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-[#1E90FF]/20 to-[#0057B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-[#0057B8]/15 to-[#1E90FF]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1E90FF]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-full shadow-lg">
            <span className="w-2 h-2 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full mr-2 animate-pulse"></span>
            <span className="text-[#0057B8] text-sm font-medium">Solusi Teknologi Terkini</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-gray-900 mt-2">Punya masalah website?</span>
            <span className="block bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
              Gawe.in
              <span className="inline text-gray-900 mt-2"> aja, Beres!</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ubah ide kamu jadi pengalaman digital yang keren dan bermanfaat! Kami siap bantu bikin website, software, dan desain UI/UX yang bikin bisnis kamu makin maju dan nggak ribet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="primary" className="min-w-[200px]">
              Mulai Proyekmu
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]">
              Lihat Hasil Kerja Kami
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                100+
              </div>
              <div className="text-gray-600 text-sm mt-1">Proyek Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-gray-600 text-sm mt-1">Klien Yang Puas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-gray-600 text-sm mt-1">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-600 text-sm mt-1">Siap Membantu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#1E90FF] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#1E90FF] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
