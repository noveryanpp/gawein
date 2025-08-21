'use client'

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactPageContent />
      <Footer />
    </main>
  )
}

const ContactPageContent = () => {
  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan proyek biasanya?",
      answer: "Durasi proyek tergantung pada tingkat kompleksitas dan ruang lingkupnya. Website sederhana biasanya selesai dalam 2-4 minggu, sedangkan aplikasi web kompleks bisa memakan waktu 2-4 bulan. Kami akan memberikan estimasi waktu detail saat konsultasi awal."
    },
    {
      question: "Apakah Gawein menyediakan dukungan dan maintenance berkelanjutan?",
      answer: "Tentu! Kami menawarkan paket dukungan dan maintenance lengkap, termasuk update keamanan, monitoring performa, perbaikan bug, dan penambahan fitur. Dukungan kami tersedia 24/7 untuk masalah kritis."
    },
    {
      question: "Apakah saya bisa request fitur khusus sesuai kebutuhan bisnis?",
      answer: "Bisa banget! Kami selalu menyesuaikan solusi dengan kebutuhan unik bisnismu. Silakan diskusikan ide dan fitur yang kamu inginkan saat konsultasi, dan tim kami akan membantu mewujudkannya."
    },
    {
      question: "Bagaimana proses kerja sama dengan Gawein?",
      answer: "Prosesnya mudah! Mulai dari konsultasi, penentuan kebutuhan, pembuatan proposal, pengembangan, hingga revisi dan peluncuran. Kami selalu update progres secara transparan dan komunikatif."
    },
    {
      question: "Apakah harga yang ditawarkan sudah termasuk revisi?",
      answer: "Ya, harga yang kami tawarkan sudah termasuk revisi sesuai kesepakatan awal. Kami ingin memastikan hasil akhir benar-benar sesuai harapanmu."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1E90FF]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Kontak Kami
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Mari bangun sesuatu yang{' '}
            <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
              Amazing bersama kami!
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Siap ubah ide jadi kenyataan? Ceritakan kebutuhanmu ke kami, dan kami akan bantu wujudkan solusi terbaik untuk bisnismu.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-bl from-[#1E90FF]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Temukan jawaban atas pertanyaan umum seputar layanan kami. Jika ada yang belum terjawab, jangan ragu untuk menghubungi kami!
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="text-center mt-16 p-8 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Feel free to reach out to our team directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@gawe.in"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] text-white rounded-xl font-semibold hover:from-[#0057B8] hover:to-[#003d82] transition-all duration-300 min-w-[160px]"
              >
                Email Us
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FAFAFA] text-[#0057B8] border border-[#E6F2FF] rounded-xl font-semibold hover:bg-[#E6F2FF] transition-all duration-300 min-w-[160px]"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden">
      <button
        className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/50 hover:bg-[#E6F2FF]/50 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-6 h-6 text-[#1E90FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
