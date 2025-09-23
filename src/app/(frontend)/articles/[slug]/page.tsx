import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { getArticlePostData, type SingleArticleData } from '@/lib/payload'
import { RichText } from '@/components/RichText'
import { Article } from '@/payload-types'

interface ArticleParams {
  slug: string
}

interface ArticlePageProps {
  params: Promise<ArticleParams>
}

export default async function SingleArticlePage({ params }: ArticlePageProps) {
  const articleParams = await params
  const data = await getArticlePostData(articleParams.slug)

  if (!data) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">
              Maaf, artikel yang kamu cari tidak ada atau sudah dihapus.
            </p>
            <Link href="/articles">
              <Button variant="primary">Kembali ke Article</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const { article: currentArticle, relatedArticles: relatedArticles } = data


  const firstCategory = Array.isArray(currentArticle.categories) && currentArticle.categories.length > 0
    ? currentArticle.categories[0]
    : null
  const categoryLabel = typeof firstCategory === 'object' && firstCategory?.name
    ? firstCategory.name
    : 'Kategori'

  return (
    <main className="min-h-screen">
      <Navbar />
      <ArticlePostContent
        currentArticle={currentArticle}
        relatedArticles={relatedArticles}
        categoryLabel={categoryLabel}
      />
      <Footer />
    </main>
  )
}

const ArticlePostContent = ({ currentArticle, relatedArticles, categoryLabel }: {
  currentArticle: SingleArticleData['article'],
  relatedArticles: SingleArticleData['relatedArticles'],
  categoryLabel: string
}) => {
  return (
    <>
      <section
        className="pt-24 pb-8 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2EBEFA]/10 to-transparent rounded-full blur-3xl"></div>
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#2EBEFA] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-[#2EBEFA] transition-colors">
                Artikel
              </Link>
              <span>/</span>
              <span className="text-gray-900">{categoryLabel}</span>
            </div>
          </nav>

          <div className="relative mb-8">
            <div className="h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden">
              <Image
                src={currentArticle.thumbnail.url || '/default-image.jpg'}
                alt={currentArticle.title}
                width={1200}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="flex flex-col mb-8 p-6 bg-[#FAFAFA]/90 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl max-w-6xl mx-auto -mt-16 shadow-lg">
              <div className="flex flex-wrap items-center gap-4 mb-4">
              <span
                className="px-3 py-1 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white text-sm font-semibold rounded-full">
                {categoryLabel}
              </span>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>
                  {currentArticle.createdAt
                    ? new Date(currentArticle.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                    : ''
                  }
                </span>
                  <span>•</span>
                  <span>{currentArticle.readingTime ? `${currentArticle.readingTime} min` : ''}</span>
                  <span>•</span>
                  <span>Ditulis oleh {currentArticle.author.name}</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {currentArticle.title}
              </h1>
              <p className="text-md sm:text-lg text-gray-600 leading-relaxed">
                {currentArticle.description || ''}
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#FAFAFA] to-[#E6F2FF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-[#E6F2FF]">
            <RichText
              content={currentArticle.content}
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:mb-2 prose-strong:text-gray-900"
              enableGutter={false}
            />

            <div className="mt-12 pt-8 border-t border-[#E6F2FF]">
              <h4 className="font-semibold text-gray-900 mb-4">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {currentArticle.tags.map((tag, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#E6F2FF] text-[#0057B8] text-sm font-medium rounded-full hover:bg-[#2EBEFA] hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E6F2FF]">
              <h4 className="font-semibold text-gray-900 mb-4">Bagikan artikel ini:</h4>
              <div className="flex space-x-4">
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <span>Twitter</span>
                </button>
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Terkait</h2>
              <p className="text-gray-600">Artikel lainnya yang mungkin kamu suka</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                  <article className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.thumbnail?.url || '/default-image.jpg'}
                        alt={article.title}
                        width={1200}
                        height={450}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] text-white text-xs font-semibold rounded-full">
                    Artikel
                  </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2EBEFA] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-xs">
                            <p className="font-semibold text-gray-900">
                              {article.author.name}
                            </p>
                            <p className="text-gray-500">
                              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                    {article.readingTime} min
                  </span>
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
            <Link href="/articles">
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
