'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF]/30 to-[#FAFAFA] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#1E90FF]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-4">
                Hubungi Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Yuk Mulai{' '}
                <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                  Proyekmu
                </span>
                !
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Siap ubah ide jadi kenyataan? Ceritakan kebutuhanmu ke kami, dan kami akan bantu wujudkan solusi terbaik untuk bisnismu.
              </p>
            </div>

            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">hello@gawe.in</p>
                  <p className="text-gray-600">support@gawe.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No. Telepon</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                  <p className="text-gray-600">123 Innovation Drive</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Jam Kerja</h4>
                  <p className="text-gray-600">Senin - Jumat: 09:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#1E90FF]/50 focus:border-[#1E90FF] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#1E90FF]/50 focus:border-[#1E90FF] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#1E90FF]/50 focus:border-[#1E90FF] transition-colors"
                  placeholder="Nama Perusahaan (opsional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#1E90FF]/50 focus:border-[#1E90FF] transition-colors resize-none"
                  placeholder="Ceritakan tentang proyek anda..."
                />
              </div>

              <Button type="submit" size="lg" variant="primary" className="w-full">
                Kirim
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
