'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function SingleBlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BlogPostContent />
      <Footer />
    </main>
  )
}

const BlogPostContent = () => {
  const params = useParams()
  const blogId = params.id as string

  const blogPosts = [
    {
      id: 1,
      title: 'Tips Memilih Framework JavaScript Terbaik untuk Proyek 2024',
      excerpt:
        'Panduan lengkap memilih framework JavaScript yang tepat untuk kebutuhan proyekmu. Dari React hingga Vue, temukan yang paling cocok!',
      author: 'Budi Santoso',
      authorAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      authorBio:
        'Senior Full-Stack Developer dengan 8+ tahun pengalaman dalam JavaScript dan teknologi web modern. Suka berbagi ilmu melalui artikel dan workshop.',
      publishDate: '15 Maret 2024',
      readTime: '8 min',
      category: 'development',
      categoryLabel: 'Development',
      tags: ['JavaScript', 'React', 'Vue', 'Framework'],
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      content: `
        <p>Memilih framework JavaScript yang tepat adalah salah satu keputusan paling penting dalam pengembangan aplikasi web modern. Dengan banyaknya pilihan yang tersedia, dari React hingga Vue, Angular hingga Svelte, keputusan ini bisa jadi sangat membingungkan.</p>

        <p>Dalam artikel ini, kita akan membahas berbagai framework JavaScript populer dan membantu kamu memilih yang paling sesuai dengan kebutuhan proyekmu.</p>

        <h2>Mengapa Framework JavaScript Penting?</h2>
        <p>Framework JavaScript membantu developer membangun aplikasi web yang kompleks dengan lebih efisien. Mereka menyediakan struktur, tools, dan pola yang sudah terbukti untuk memecahkan masalah umum dalam pengembangan web.</p>

        <h2>Framework JavaScript Populer di 2024</h2>
        
        <h3>1. React</h3>
        <p>React tetap menjadi pilihan utama untuk banyak developer dan perusahaan. Dikembangkan oleh Facebook (Meta), React menawarkan:</p>
        <ul>
          <li>Component-based architecture yang fleksibel</li>
          <li>Virtual DOM untuk performa optimal</li>
          <li>Ekosistem yang sangat besar</li>
          <li>Dukungan komunitas yang kuat</li>
        </ul>
        
        <p><strong>Cocok untuk:</strong> Aplikasi web besar, SPA (Single Page Applications), dan proyek yang membutuhkan fleksibilitas tinggi.</p>

        <h3>2. Vue.js</h3>
        <p>Vue.js terkenal dengan learning curve yang mudah dan dokumentasi yang excellent. Framework ini menawarkan:</p>
        <ul>
          <li>Template syntax yang mudah dipahami</li>
          <li>Progressive adoption</li>
          <li>Two-way data binding</li>
          <li>Ukuran bundle yang kecil</li>
        </ul>
        
        <p><strong>Cocok untuk:</strong> Proyek kecil hingga menengah, developer yang baru mulai dengan framework, dan aplikasi yang butuh development cepat.</p>

        <h3>3. Angular</h3>
        <p>Angular dari Google adalah full-featured framework yang cocok untuk aplikasi enterprise:</p>
        <ul>
          <li>TypeScript by default</li>
          <li>Dependency injection</li>
          <li>Powerful CLI tools</li>
          <li>Built-in testing utilities</li>
        </ul>
        
        <p><strong>Cocok untuk:</strong> Aplikasi enterprise besar, tim yang sudah familiar dengan TypeScript, dan proyek yang membutuhkan struktur yang ketat.</p>

        <h3>4. Svelte/SvelteKit</h3>
        <p>Svelte adalah compiler yang menghasilkan vanilla JavaScript yang sangat optimal:</p>
        <ul>
          <li>No virtual DOM</li>
          <li>Bundle size yang sangat kecil</li>
          <li>Syntax yang intuitif</li>
          <li>Performa runtime yang excellent</li>
        </ul>
        
        <p><strong>Cocok untuk:</strong> Aplikasi yang mengutamakan performa, proyek dengan constraint bandwidth, dan developer yang ingin mencoba pendekatan baru.</p>

        <h2>Faktor-Faktor yang Perlu Dipertimbangkan</h2>

        <h3>1. Ukuran dan Kompleksitas Proyek</h3>
        <p>Untuk proyek kecil atau prototype, Vue.js atau Svelte mungkin lebih cocok karena lebih mudah dipelajari dan di-setup. Untuk aplikasi enterprise yang besar, Angular atau React dengan ekosistemnya yang mature lebih disarankan.</p>

        <h3>2. Tim dan Skill Level</h3>
        <p>Pertimbangkan skill level tim kamu. Vue.js memiliki learning curve yang paling mudah, sedangkan Angular membutuhkan pengetahuan TypeScript yang solid.</p>

        <h3>3. Performance Requirements</h3>
        <p>Jika performa adalah prioritas utama, Svelte atau Vue.js bisa jadi pilihan terbaik. React juga performant tapi membutuhkan optimisasi yang lebih hati-hati.</p>

        <h3>4. Ekosistem dan Community Support</h3>
        <p>React memiliki ekosistem terbesar dengan banyak library dan tools pendukung. Vue.js juga memiliki ekosistem yang solid meski lebih kecil dari React.</p>

        <h2>Rekomendasi Berdasarkan Use Case</h2>

        <h3>Startup/MVP</h3>
        <p><strong>Pilihan terbaik: Vue.js atau React</strong><br>
        Development cepat, learning curve yang reasonable, dan ekosistem yang cukup untuk kebutuhan awal.</p>

        <h3>Enterprise Application</h3>
        <p><strong>Pilihan terbaik: Angular atau React</strong><br>
        Struktur yang mature, dukungan TypeScript, dan tools untuk development skala besar.</p>

        <h3>Performance-Critical Apps</h3>
        <p><strong>Pilihan terbaik: Svelte atau Vue.js</strong><br>
        Bundle size kecil dan runtime performance yang optimal.</p>

        <h3>E-commerce/Content Sites</h3>
        <p><strong>Pilihan terbaik: Next.js (React) atau Nuxt.js (Vue)</strong><br>
        SSR/SSG untuk SEO yang optimal dan loading time yang cepat.</p>

        <h2>Tips Praktis untuk Memilih</h2>

        <ol>
          <li><strong>Buat prototype kecil</strong> dengan 2-3 framework pilihan untuk merasakan developer experience-nya</li>
          <li><strong>Pertimbangkan long-term maintenance</strong> - pilih framework yang akan tetap relevan 3-5 tahun ke depan</li>
          <li><strong>Lihat job market</strong> - framework populer biasanya lebih mudah untuk mencari developer</li>
          <li><strong>Evaluasi dokumentasi</strong> - dokumentasi yang baik akan sangat membantu development process</li>
          <li><strong>Check ekosistem</strong> - pastikan ada library/tools yang kamu butuhkan</li>
        </ol>

        <h2>Kesimpulan</h2>

        <p>Tidak ada framework "terbaik" secara absolut - yang ada adalah framework yang paling cocok untuk kebutuhan spesifik proyekmu. Pertimbangkan faktor-faktor seperti ukuran tim, timeline proyek, requirements performa, dan skill level yang tersedia.</p>

        <p>Untuk sebagian besar kasus, React dan Vue.js adalah pilihan yang aman dan proven. Angular bagus untuk proyek enterprise, sedangkan Svelte menawarkan inovasi dan performa yang excellent untuk use case tertentu.</p>

        <p>Yang terpenting adalah memilih framework yang bisa kamu dan tim kamu kuasai dengan baik, karena skill dan pemahaman developer adalah faktor paling penting dalam kesuksesan sebuah proyek.</p>
      `,
    },
    {
      id: 2,
      title: 'UI/UX Design Trends yang Wajib Kamu Tahu di 2024',
      excerpt:
        'Tren desain terbaru yang akan mendominasi tahun 2024. Mulai dari minimalism hingga bold colors, semuanya ada di sini!',
      author: 'Sari Dewi',
      authorAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      authorBio:
        'UI/UX Designer dengan passion untuk menciptakan pengalaman pengguna yang meaningful. Berpengalaman 6+ tahun di berbagai industri.',
      publishDate: '12 Maret 2024',
      readTime: '6 min',
      category: 'design',
      categoryLabel: 'Design',
      tags: ['UI', 'UX', 'Design', 'Trends'],
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      content: `
        <p>Dunia design terus berevolusi, dan tahun 2024 membawa tren-tren baru yang menarik untuk diikuti. Sebagai designer atau developer, penting untuk tetap update dengan perkembangan terbaru agar karya kita tetap relevan dan engaging.</p>

        <h2>1. Minimalism dengan Personal Touch</h2>
        <p>Minimalism masih menjadi raja, tapi dengan twist baru. Designer mulai menambahkan elemen personal yang membuat design terasa lebih human dan relatable.</p>

        <h2>2. Bold Typography</h2>
        <p>Typography besar dan berani menjadi focal point dalam banyak design. Ini membantu menciptakan hierarchy yang klear dan memberikan impact visual yang kuat.</p>

        <h2>3. Sustainable Design</h2>
        <p>Eco-friendly design principles semakin penting. Ini termasuk penggunaan warna yang eco-inspired dan design yang promote sustainability message.</p>
      `,
    },
  ]

  const currentBlog = blogPosts.find((blog) => blog.id === parseInt(blogId))

  const relatedBlogs = blogPosts
    .filter((blog) => blog.id !== parseInt(blogId) && blog.category === currentBlog?.category)
    .slice(0, 3)

  if (!currentBlog) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">
            Maaf, artikel yang kamu cari tidak ada atau sudah dihapus.
          </p>
          <Link href="/blog">
            <Button variant="primary">Kembali ke Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{currentBlog.categoryLabel}</span>
            </div>
          </nav>

          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-primary to-[#0057B8] text-white text-sm font-semibold rounded-full">
                {currentBlog.categoryLabel}
              </span>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{currentBlog.publishDate}</span>
                <span>•</span>
                <span>{currentBlog.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {currentBlog.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            {currentBlog.excerpt}
          </p>

          <div className="flex items-center space-x-4 mb-8 p-6 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl">
            <Image
              src={currentBlog.authorAvatar}
              alt={currentBlog.author}
              width={150}
              height={150}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{currentBlog.author}</h3>
              <p className="text-gray-600 text-sm">{currentBlog.authorBio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden mb-8">
            <Image
              src={currentBlog.image}
              alt={currentBlog.title}
              width={1200}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pb-16 bg-gradient-to-b from-[#FAFAFA] to-[#E6F2FF]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E6F2FF]">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:mb-2 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: currentBlog.content }}
            />

            <div className="mt-12 pt-8 border-t border-[#E6F2FF]">
              <h4 className="font-semibold text-gray-900 mb-4">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {currentBlog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#E6F2FF] text-[#0057B8] text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E6F2FF]">
              <h4 className="font-semibold text-gray-900 mb-4">Bagikan artikel ini:</h4>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <span>Twitter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Terkait</h2>
              <p className="text-gray-600">Artikel lainnya yang mungkin kamu suka</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                  <article className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={1200}
                        height={450}
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
          </div>
        </section>
      )}

      <section className="py-8 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/blog">
              <Button variant="outline" className="w-full sm:w-auto">
                ← Kembali ke Semua Artikel
              </Button>
            </Link>
            <div className="flex space-x-4">
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Ada Pertanyaan?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
