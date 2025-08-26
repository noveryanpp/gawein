'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF] to-blue-500"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#1E90FF]/30 to-[#0057B8]/40"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Siap Ubah
              <span className="text-[#E6F2FF]"> Bisnismu ke Dunia Digital?</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#E6F2FF] leading-relaxed">
              Yuk kolaborasi bareng kami untuk mewujudkan ide kamu jadi solusi teknologi yang keren dan bermanfaat. Tim kami siap bantu bisnismu tampil maksimal di dunia digital!
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px] bg-white text-[#0057B8] hover:bg-[#E6F2FF] border-0"
              >
                Mulai Proyekmu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-[#0057B8]"
              >
                Jadwalkan Panggilan
              </Button>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Email Kami</h4>
                <p className="text-[#E6F2FF]">hello@gawe.in</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Hubungi Kami</h4>
                <p className="text-[#E6F2FF]">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Kunjungi Kami</h4>
                <p className="text-[#E6F2FF]">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
