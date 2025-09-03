'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/blog', label: 'Artikel' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/contact', label: 'Kontak' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAFA]/80 backdrop-blur-lg border-b border-[#E6F2FF] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={100} height={50} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button size="sm" variant="primary">
              Mulai Sekarang
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#E6F2FF] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-3'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}
              />
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAFA]/95 backdrop-blur-lg border-t border-[#E6F2FF] rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button size="md" variant="primary" className="w-full">
                  Mulai Sekarang
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
