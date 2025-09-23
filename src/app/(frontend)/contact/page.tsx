import React from 'react'
import { ContactSection } from '@/components/ContactSection'
import { getSocialLinks, type SocialLinkItem } from '@/lib/payload'

export default function ContactPage() {
  return (
    <main>
      <ContactPageContent />
    </main>
  )
}

const ContactPageContent = async () => {
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
    </>
  )
}
