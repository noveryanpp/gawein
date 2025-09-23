'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { SimplifiedPortfolio } from '@/lib/payload'

interface PortfolioSectionProps {
  portfolios: SimplifiedPortfolio[]
}

export const PortfolioSection = ({ portfolios }: PortfolioSectionProps) => {
  return (
    <section id="portfolio" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-bl from-[#2EBEFA]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#0057B8]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-4">
            Portfolio Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Karya Terbaik{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Yang Kami Banggakan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lihat beberapa proyek terbaru yang telah kami selesaikan dengan sempurna untuk klien-klien dari berbagai industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group bg-[#FAFAFA]/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                {portfolio.image?.url ? (
                  <Image
                    src={portfolio.image.url}
                    alt={portfolio.image.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#E6F2FF] to-[#FAFAFA] flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#2EBEFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {portfolio.slug && (
                    <a
                      href={'/portfolio/' + portfolio.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-[#0057B8] rounded-lg text-sm font-semibold hover:bg-white transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Lihat Project
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2EBEFA] transition-colors">
                  {portfolio.title}
                </h3>
                {portfolio.description && (
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {portfolio.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Punya ide project yang menarik? Mari kita diskusikan dan wujudkan bersama!
          </p>
          <Link href={'/portfolio'} >
            <Button size="lg">
              Lihat Semua Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
