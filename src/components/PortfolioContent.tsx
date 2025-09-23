'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SimplifiedPortfolio, SimplifiedCategory } from '@/lib/payload'

interface PortfolioContentProps {
  portfolios: SimplifiedPortfolio[]
  services: SimplifiedCategory[]
  totalPages: number
  currentPage: number
  selectedService: string
  searchQuery?: string
}

export const PortfolioContent = ({
  portfolios,
  services,
  totalPages,
  currentPage,
  selectedService,
  searchQuery = ''
}: PortfolioContentProps) => {
  const [searchInput, setSearchInput] = useState(searchQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  const handleServiceChange = (serviceSlug: string) => {
    const params = new URLSearchParams(searchParams)
    if (serviceSlug !== 'all') {
      params.set('service', serviceSlug)
    } else {
      params.delete('service')
    }
    params.set('page', '1')
    router.push(`/portfolio?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/portfolio?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchInput.trim()) {
      params.set('search', searchInput.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/portfolio?${params.toString()}`)
  }

  const handleResetFilter = () => {
    setSearchInput('')
    router.push('/portfolio')
  }

  const serviceOptions = [
    { label: 'Semua Layanan', value: 'all' },
    ...services.map(service => ({ label: service.title, value: service.slug }))
  ]

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Portfolio Kami
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Karya Digital{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Terbaik Kami
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lihat berbagai proyek yang telah kami selesaikan untuk klien-klien terpercaya.
            Dari website hingga aplikasi mobile, setiap karya dibuat dengan dedikasi tinggi.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl p-8 mb-12">
            <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cari Portfolio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Cari berdasarkan nama proyek, teknologi, atau tag..."
                    className="w-full px-4 py-3 pl-12 border border-[#E6F2FF] rounded-2xl focus:ring-2 focus:ring-[#2EBEFA] focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter Layanan
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E6F2FF] rounded-2xl focus:ring-2 focus:ring-[#2EBEFA] focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-900"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <Button type="submit" variant="primary" className="flex-1">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Cari
                </Button>
                {(selectedService !== 'all' || searchQuery) && (
                  <Button type="button" variant="outline" onClick={handleResetFilter}>
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Menampilkan <span className="font-semibold text-gray-900">{portfolios.length}</span> portfolio
              {selectedService !== 'all' && (
                <span> dalam kategori <span className="font-semibold text-[#0057B8]">
                  {serviceOptions.find(opt => opt.value === selectedService)?.label}
                </span></span>
              )}
              {searchQuery && (
                <span> untuk pencarian "<span className="font-semibold text-[#0057B8]">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <article key={portfolio.id} className="group">
                <Link
                  href={`/portfolio/${portfolio.slug}`}
                >
                  <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl overflow-hidden hover:shadow-2xl hover:border-[#2EBEFA]/30 transition-all duration-500">
                  <div className="relative overflow-hidden">
                    {portfolio.image ? (
                      <Image
                        src={portfolio.image.url}
                        alt={portfolio.image.alt}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0057B8] text-xs font-semibold rounded-full">
                        {portfolio.service.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0057B8] transition-colors duration-300">
                        {portfolio.title}
                      </h3>
                      {portfolio.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {portfolio.description}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      {portfolio.client && (
                        <p className="text-sm text-gray-500 mb-1">
                          <span className="font-medium">Klien:</span> {portfolio.client}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Selesai:</span> {formatDate(portfolio.completedAt)}
                      </p>
                    </div>

                    {/* Technologies */}
                    {portfolio.technologies && portfolio.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {portfolio.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-[#E6F2FF] text-[#0057B8] text-xs font-medium rounded-lg">
                              {tech.technology}
                            </span>
                          ))}
                          {portfolio.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{portfolio.technologies.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      className="inline-flex items-center text-[#0057B8] font-semibold hover:text-[#2EBEFA] transition-colors duration-300 group"
                    >
                      Lihat Detail
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {portfolios.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#E6F2FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#0057B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Tidak Ditemukan</h3>
              <p className="text-gray-600 mb-6">
                Maaf, tidak ada portfolio yang sesuai dengan kriteria pencarian Anda.
              </p>
              <Button onClick={handleResetFilter} variant="primary">
                Reset Filter
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 border border-[#E6F2FF] rounded-xl hover:bg-[#E6F2FF] transition-colors duration-300"
                  >
                    Sebelumnya
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
                      page === currentPage
                        ? 'bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white'
                        : 'border border-[#E6F2FF] hover:bg-[#E6F2FF]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 border border-[#E6F2FF] rounded-xl hover:bg-[#E6F2FF] transition-colors duration-300"
                  >
                    Selanjutnya
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
