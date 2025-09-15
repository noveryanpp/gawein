import React from 'react'
import { ContactSection } from '@/components/ContactSection'
import { FAQItem } from '@/components/ui/FAQItem'
import { getFaqs, type SimplifiedFaq, getSocialLinks, type SocialLinkItem } from '@/lib/payload'

export default function ContactPage() {
  return (
    <main>
      <ContactPageContent />
    </main>
  )
}

const ContactPageContent = async () => {
  const faqs: SimplifiedFaq[] = await getFaqs()
  const socials: SocialLinkItem[] = await getSocialLinks()

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Kontak Kami
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Mari bangun sesuatu yang{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Amazing bersama kami!
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Siap ubah ide jadi kenyataan? Ceritakan kebutuhanmu ke kami, dan kami akan bantu
            wujudkan solusi terbaik untuk bisnismu.
          </p>
        </div>
      </section>

      <ContactSection socials={socials} />

      {/* FAQ Section */}
      {
        faqs.length > 0 && (
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

              <div className="text-center mt-16 p-8 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Tidak menemukan jawaban yang kamu cari? Jangan ragu untuk menghubungi kami langsung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:hello@gawe.in"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white rounded-xl font-semibold hover:from-[#0057B8] hover:to-[#003d82] transition-all duration-300 min-w-[160px]"
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
        )
      }
    </>
  )
}
