'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export const AboutSection = () => {
  return (
    <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full">
                Tentang Gawein
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Kami Bangun
                <span className="block bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                  Masa Depan Digital
                </span>
                Mulai Hari Ini
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Di Gawein, kami antusias mengubah ide-ide inovatif jadi solusi digital yang bermanfaat. Tim developer, desainer, dan strategis kami siap berkolaborasi untuk menghadirkan teknologi terkini yang bikin bisnismu makin berkembang.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Inovasi Utama</h3>
                  <p className="text-gray-600">Kami memanfaatkan teknologi terbaru untuk menciptakan solusi yang siap masa depan.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pendekatan Berfokus pada Klien</h3>
                  <p className="text-gray-600">Kesuksesan kamu adalah prioritas kami. Solusi kami selalu disesuaikan dengan kebutuhan unikmu.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Jaminan Kualitas</h3>
                  <p className="text-gray-600">Setiap proyek kami selalu melalui pengujian ketat dan perhatian pada detail.</p>
                </div>
              </div>
            </div>

            <Button size="lg" variant="primary">
              Kenali Kami Lebih Dekat
            </Button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#1E90FF]/10 to-[#0057B8]/10 rounded-3xl p-8 backdrop-blur-sm border border-[#E6F2FF] shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#FAFAFA] to-[#E6F2FF] rounded-2xl p-6 backdrop-blur-sm border border-[#E6F2FF]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pengembangan Web</h4>
                  <p className="text-sm text-gray-600">Solusi bisnis masa kini</p>
                </div>
                <div className="bg-gradient-to-br from-[#FAFAFA] to-[#E6F2FF] rounded-2xl p-6 backdrop-blur-sm border border-[#E6F2FF]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Desain</h4>
                  <p className="text-sm text-gray-600">Pengalaman pengguna adalah nomor satu</p>
                </div>
                <div className="bg-gradient-to-br from-[#FAFAFA] to-[#E6F2FF] rounded-2xl p-6 backdrop-blur-sm border border-[#E6F2FF]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performa</h4>
                  <p className="text-sm text-gray-600">Super cepat dan ringan</p>
                </div>
                <div className="bg-gradient-to-br from-[#FAFAFA] to-[#E6F2FF] rounded-2xl p-6 backdrop-blur-sm border border-[#E6F2FF]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Keamanan</h4>
                  <p className="text-sm text-gray-600">Web-mu sudah pasti aman dari hacker nakal!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
