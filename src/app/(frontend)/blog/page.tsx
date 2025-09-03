'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function BlogPage() {
  return (
    <main>
      <BlogContent />
    </main>
  )
}

const BlogContent = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('semua')
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const blogPosts = [
    {
      id: 1,
      title: 'Tips Memilih Framework JavaScript Terbaik untuk Proyek 2024',
      excerpt:
        'Panduan lengkap memilih framework JavaScript yang tepat untuk kebutuhan proyekmu. Dari React hingga Vue, temukan yang paling cocok!',
      content: 'Artikel lengkap tentang framework JavaScript...',
      author: 'Budi Santoso',
      authorAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '15 Maret 2024',
      readTime: '8 min',
      category: 'development',
      categoryLabel: 'Development',
      tags: ['JavaScript', 'React', 'Vue', 'Framework'],
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      id: 2,
      title: 'UI/UX Design Trends yang Wajib Kamu Tahu di 2024',
      excerpt:
        'Tren desain terbaru yang akan mendominasi tahun 2024. Mulai dari minimalism hingga bold colors, semuanya ada di sini!',
      content: 'Artikel lengkap tentang UI/UX trends...',
      author: 'Sari Dewi',
      authorAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '12 Maret 2024',
      readTime: '6 min',
      category: 'design',
      categoryLabel: 'Design',
      tags: ['UI', 'UX', 'Design', 'Trends'],
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
    {
      id: 3,
      title: 'Cara Optimasi Website untuk SEO dan Performance',
      excerpt:
        'Strategi jitu meningkatkan performa website dan ranking SEO. Tips praktis yang bisa langsung kamu terapkan hari ini!',
      content: 'Artikel lengkap tentang SEO optimization...',
      author: 'Ahmad Rizki',
      authorAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '10 Maret 2024',
      readTime: '10 min',
      category: 'seo',
      categoryLabel: 'SEO',
      tags: ['SEO', 'Performance', 'Website', 'Optimization'],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
    {
      id: 4,
      title: 'Panduan Lengkap Membangun API dengan Node.js dan Express',
      excerpt:
        'Tutorial step-by-step membuat RESTful API yang robust dengan Node.js. Cocok untuk pemula hingga developer berpengalaman!',
      content: 'Artikel lengkap tentang Node.js API...',
      author: 'Dina Marlina',
      authorAvatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '8 Maret 2024',
      readTime: '12 min',
      category: 'development',
      categoryLabel: 'Development',
      tags: ['Node.js', 'Express', 'API', 'Backend'],
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
    {
      id: 5,
      title: 'Mobile App Development: Native vs Cross-Platform',
      excerpt:
        'Perbandingan lengkap antara native dan cross-platform development. Mana yang lebih cocok untuk proyekmu?',
      content: 'Artikel lengkap tentang mobile development...',
      author: 'Eko Prasetyo',
      authorAvatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '5 Maret 2024',
      readTime: '9 min',
      category: 'mobile',
      categoryLabel: 'Mobile',
      tags: ['Mobile', 'Native', 'Cross-Platform', 'React Native'],
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      id: 6,
      title: 'Keamanan Website: Cara Melindungi Aplikasi dari Hacker',
      excerpt:
        'Tips dan strategi penting untuk menjaga keamanan website dan aplikasi web dari berbagai ancaman cyber.',
      content: 'Artikel lengkap tentang web security...',
      author: 'Maya Sari',
      authorAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '3 Maret 2024',
      readTime: '7 min',
      category: 'security',
      categoryLabel: 'Security',
      tags: ['Security', 'Hacking', 'Web Security', 'Cybersecurity'],
      image:
        'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
    {
      id: 7,
      title: 'Docker dan Kubernetes untuk Pemula: Deployment yang Mudah',
      excerpt:
        'Pelajari cara menggunakan Docker dan Kubernetes untuk deployment aplikasi yang lebih efisien dan skalabel.',
      content: 'Artikel lengkap tentang Docker dan Kubernetes...',
      author: 'Rudi Hermawan',
      authorAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '1 Maret 2024',
      readTime: '11 min',
      category: 'devops',
      categoryLabel: 'DevOps',
      tags: ['Docker', 'Kubernetes', 'DevOps', 'Deployment'],
      image:
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
    {
      id: 8,
      title: 'Progressive Web Apps (PWA): Masa Depan Aplikasi Web',
      excerpt:
        'Kenali teknologi PWA dan bagaimana cara membuatnya. Solusi terbaik untuk pengalaman mobile yang seamless!',
      content: 'Artikel lengkap tentang PWA...',
      author: 'Lisa Permata',
      authorAvatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      publishDate: '28 Februari 2024',
      readTime: '8 min',
      category: 'development',
      categoryLabel: 'Development',
      tags: ['PWA', 'Web App', 'Mobile', 'Progressive'],
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
    },
  ]

  const categories = [
    { value: 'semua', label: 'Semua Artikel' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'seo', label: 'SEO' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'security', label: 'Security' },
    { value: 'devops', label: 'DevOps' },
  ]

  const filteredBlogs = blogPosts.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'semua' || blog.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const endIndex = startIndex + blogsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  const featuredBlogs = blogPosts.filter((blog) => blog.featured).slice(0, 2)

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Blog Gawein
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Insight & Tips{' '}
            <span className="bg-gradient-to-r from-primary to-[#0057B8] bg-clip-text text-transparent">
              Teknologi Terbaru
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan artikel, tutorial, dan insights terbaru seputar teknologi, design, dan
            development yang bisa bantu kamu berkembang di dunia digital.
          </p>
        </div>
      </section>

      {featuredBlogs.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-[#FAFAFA] to-[#E6F2FF]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Pilihan</h2>
              <p className="text-gray-600">Artikel terbaik yang wajib kamu baca</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                  <article className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={800}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary to-[#0057B8] text-white text-sm font-semibold rounded-full">
                          {blog.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={blog.authorAvatar}
                            alt={blog.author}
                            width={150}
                            height={150}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{blog.author}</p>
                            <p className="text-gray-500">{blog.publishDate}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{blog.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-3xl p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cari Artikel
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik kata kunci..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E6F2FF] rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E6F2FF]">
              <p className="text-gray-600">
                Menampilkan {currentBlogs.length} dari {filteredBlogs.length} artikel
              </p>
            </div>
          </div>

          {currentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                  <article className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={800}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-gradient-to-r from-primary to-[#0057B8] text-white text-xs font-semibold rounded-full">
                          {blog.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#E6F2FF] text-[#0057B8] text-xs font-medium rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{blog.tags.length - 2} lainnya
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src={blog.authorAvatar}
                            alt={blog.author}
                            width={150}
                            height={150}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div className="text-xs">
                            <p className="font-semibold text-gray-900">{blog.author}</p>
                            <p className="text-gray-500">{blog.publishDate}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{blog.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-[#0057B8] rounded-full flex items-center justify-center mx-auto mb-6">
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
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('semua')
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#FAFAFA] border border-[#E6F2FF] rounded-xl hover:bg-[#E6F2FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sebelumnya
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-xl transition-colors ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-primary to-[#0057B8] text-white'
                        : 'bg-[#FAFAFA] border border-[#E6F2FF] hover:bg-[#E6F2FF]'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
