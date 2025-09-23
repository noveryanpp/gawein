'use client'

import React from 'react'
import { FAQItem } from '@/components/ui/FAQItem'
import { type SimplifiedFaq } from '@/lib/payload'

interface FAQSectionProps {
  faqs: SimplifiedFaq[]
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50 relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-bl from-[#2EBEFA]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
                Questions
              </span>
          </h2>
          <p className="text-lg text-gray-600">
            Temukan jawaban atas pertanyaan umum seputar layanan kami. Jika ada yang belum
            terjawab, jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="text-center mt-16 p-8 bg-[#FFFFFF] backdrop-blur-sm border border-[#E6F2FF] rounded-3xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Memiliki pertanyaan lain?</h3>
          <p className="text-gray-600 mb-2">
            Tidak menemukan jawaban yang kamu cari? Jangan ragu untuk menghubungi kami langsung.
          </p>
        </div>
      </div>
    </section>
  )
}