import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import RichText from '@/components/RichText'
import { PortfolioGallery } from '@/components/PortfolioGallery'
import type { FullPortfolio } from '@/lib/payload'

interface SinglePortfolioContentProps {
  portfolio: FullPortfolio
}

export const SinglePortfolioContent = ({ portfolio }: SinglePortfolioContentProps) => {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Tidak diketahui'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-[#0057B8] transition-colors duration-300">
              Beranda
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/portfolio" className="hover:text-[#0057B8] transition-colors duration-300">
              Portfolio
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#0057B8] font-medium">{portfolio.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full">
                  {portfolio.service.title}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                {portfolio.title}
              </h1>

              {portfolio.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {portfolio.description}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {portfolio.client && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Klien
                    </h3>
                    <p className="text-lg font-medium text-gray-900">{portfolio.client}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Tanggal Selesai
                  </h3>
                  <p className="text-lg font-medium text-gray-900">{formatDate(portfolio.completedAt)}</p>
                </div>
              </div>

              {portfolio.url && (
                <div className="pt-4">
                  <Link href={portfolio.url} target="_blank" rel="noopener noreferrer" >
                    <Button
                      variant="primary"
                      size="lg"
                      className="group"
                    >
                      Lihat Website
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Main Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#2EBEFA]/20 to-[#0057B8]/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                {portfolio.image ? (
                  <Image
                    src={portfolio.image.url}
                    alt={portfolio.image.alt}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Detail Proyek</h2>

            {portfolio.content && (
              <div className="prose prose-lg max-w-none mb-12">
                <RichText content={portfolio.content} />
              </div>
            )}

            {/* Technologies */}
            {portfolio.technologies && portfolio.technologies.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Teknologi yang Digunakan</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {portfolio.technologies.map((tech, index) => (
                    <div key={index} className="bg-white border border-[#E6F2FF] rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-300">
                      <span className="text-gray-900 font-medium">{tech.technology}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {portfolio.tags && portfolio.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolio.tags.map((tag) => (
                    <span key={tag.id} className="px-4 py-2 bg-[#E6F2FF] text-[#0057B8] font-medium rounded-xl hover:bg-[#2EBEFA] hover:text-white transition-colors duration-300">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {portfolio.gallery && portfolio.gallery.length > 0 && (
        <PortfolioGallery
          gallery={portfolio.gallery}
          mainImage={portfolio.image}
        />
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-800 via-[#0057B8] to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Tertarik dengan Proyek Serupa?
          </h2>
          <p className="text-lg text-[#E6F2FF] max-w-2xl mx-auto mb-8">
            Konsultasi gratis untuk membahas kebutuhan proyek Anda.
            Tim ahli kami siap membantu mewujudkan visi digital Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/contact"} >
              <Button
                variant="secondary"
                size="lg"
                className="group"
              >
                Konsultasi Gratis
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href={"/portfolio"} >
              <Button
                variant="outline"
                size="lg"
                className="group border-white/30 text-white hover:bg-white hover:text-[#0057B8]"
              >
                Lihat Portfolio Lainnya
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
