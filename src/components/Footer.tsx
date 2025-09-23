import React from 'react'
import Link from 'next/link'
import { getFooterData } from '@/lib/payload'
import { Logo } from './ui/Logo'
import Image from 'next/image'

export const Footer = async () => {
  const currentYear = new Date().getFullYear()
  const { socials, services } = await getFooterData()

  const serviceLinks = services.map((service: { title: string; slug: string }) => ({
    name: service.title,
    href: `/services#${service.slug}`,
  }))

  const footerLinks = {
    services: [
      {
        name: 'Semua Layanan',
        href: '/services',
      },
      ...serviceLinks
    ],
    company: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Tim Kami', href: '/about#team' },
      { name: 'Kontak', href: '/contact' },
    ],
    resources: [
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Artikel', href: '/articles' },
      { name: 'FAQ', href: '/#faq' },
    ]
  }

  const socialLinks = socials

  return (
    <footer className="bg-gradient-to-br from-blue-800 via-[#0057B8] to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant='secondary' />
              </Link>
              <p className="text-[#E6F2FF] leading-relaxed max-w-sm">
                Punya masalah web? Gawe.in aja, Beres!
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url || '#'}
                    target="_blank"
                    aria-label={social.text}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#2EBEFA] transition-all duration-300 hover:scale-110"
                  >
                    {social.icon && (
                      <Image src={social.icon.url} alt={social.platform} className="w-5 h-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Peta Website</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#E6F2FF] hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Layanan</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#E6F2FF] hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Perusahaan</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#E6F2FF] hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/*<div className="space-y-4">*/}
            {/*  <h4 className="text-lg font-semibold text-white">Legal</h4>*/}
            {/*  <ul className="space-y-2">*/}
            {/*    {footerLinks.legal.map((link) => (*/}
            {/*      <li key={link.name}>*/}
            {/*        <Link*/}
            {/*          href={link.href}*/}
            {/*          className="text-[#E6F2FF] hover:text-white transition-colors duration-300"*/}
            {/*        >*/}
            {/*          {link.name}*/}
            {/*        </Link>*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#E6F2FF] text-sm">© {currentYear} Gawein. Hak cipta dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
