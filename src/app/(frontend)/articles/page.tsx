import React from 'react'
import { getArticlePageData, type ArticlePageData } from '@/lib/payload'
import { ArticleContent } from '@/components/ArticleContent'

interface SearchParams {
  page?: string
  category?: string
  search?: string
}

interface ArticlePageProps {
  searchParams: Promise<SearchParams>
}

export default async function ArticlePage({ searchParams }: ArticlePageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const categorySlug = params.category || 'all'
  const searchTerm = params.search || ''

  const data: ArticlePageData = await getArticlePageData(page, 6, categorySlug, searchTerm)

  return (
    <main>
      <ArticleContent
        articles={data.articles}
        categories={data.categories}
        totalPages={data.totalPages}
        currentPage={page}
        selectedCategory={categorySlug}
        searchQuery={searchTerm}
      />
    </main>
  )
}
