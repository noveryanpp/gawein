'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SimplifiedArticle, SimplifiedCategory } from '@/lib/payload'

interface ArticleContentProps {
  articles: SimplifiedArticle[]
  categories: SimplifiedCategory[]
  totalPages: number
  currentPage: number
  selectedCategory: string
  searchQuery?: string
}

export const ArticleContent = ({ articles, categories, totalPages, currentPage, selectedCategory, searchQuery = '' }: ArticleContentProps) => {
  const [searchInput, setSearchInput] = useState(searchQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams)
    if (categorySlug !== 'all') {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    params.set('page', '1')
    router.push(`/articles?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/articles?${params.toString()}`)
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
    router.push(`/articles?${params.toString()}`)
  }

  const handleResetFilter = () => {
    setSearchInput('')
    router.push('/articles')
  }

  const categoryOptions = [
    { label: 'Semua Kategori', value: 'all' },
    ...categories.map(cat => ({ label: cat.name, value: cat.slug }))
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Artikel Gawein
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Insight & Tips{' '}
            <span className="bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Teknologi Terbaru
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan artikel, tutorial, dan insights terbaru seputar teknologi, design, dan
            development yang bisa bantu kamu berkembang di dunia digital.
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
                  Cari Artikel
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik kata kunci..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full px-4 py-3 pl-12 text-black bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#2EBEFA]/50 focus:border-[#2EBEFA] transition-colors"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 text-black py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-[#2EBEFA]/50 focus:border-[#2EBEFA] transition-colors"
                >
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] hover:from-[#0057B8] hover:to-[#2EBEFA] text-white"
                >
                  Cari
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E6F2FF]">
              <p className="text-gray-600">
                Menampilkan {articles.length} artikel
                {searchQuery && ` untuk pencarian "${searchQuery}"`}
                {selectedCategory !== 'all' && ` dalam kategori "${categories.find(c => c.slug === selectedCategory)?.name}"`}
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                  <article className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.thumbnail?.url || '/placeholder-image.jpg'}
                        alt={article.thumbnail?.alt || article.title}
                        width={800}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {article.categories && article.categories.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white text-xs font-semibold rounded-full">
                            {article.categories[0].name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2EBEFA] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {article.description}
                      </p>

                      {/* Display tags if available */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag.name}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          <p className="font-semibold text-gray-900">{article.author}</p>
                          <p className="text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">{article.readingTime} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-gray-600 mb-6">
                Coba ganti kata kunci atau pilih kategori yang berbeda.
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilter}
              >
                Reset Filter
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#FAFAFA] border border-[#E6F2FF] rounded-xl hover:bg-[#E6F2FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sebelumnya
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pg = index + 1
                return (
                  <button
                    key={pg}
                    onClick={() => handlePageChange(pg)}
                    className={`px-4 py-2 rounded-xl transition-colors ${currentPage === pg
                        ? 'bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white'
                        : 'bg-[#FAFAFA] border border-[#E6F2FF] hover:bg-[#E6F2FF]'
                      }`}
                  >
                    {pg}
                  </button>
                )
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#FAFAFA] border border-[#E6F2FF] rounded-xl hover:bg-[#E6F2FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
