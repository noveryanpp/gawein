import React from 'react'
import { getPortfolioPageData } from '@/lib/payload'
import { PortfolioContent } from '@/components/PortfolioContent'

interface SearchParams {
  page?: string
  service?: string
  search?: string
}

interface PortfolioPageProps {
  searchParams: Promise<SearchParams>
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const serviceSlug = params.service || 'all'
  const searchTerm = params.search || ''

  const data = await getPortfolioPageData(page, 9, serviceSlug, searchTerm)

  return (
    <main>
      <PortfolioContent
        portfolios={data.portfolios}
        services={data.services}
        totalPages={data.totalPages}
        currentPage={page}
        selectedService={serviceSlug}
        searchQuery={searchTerm}
      />
    </main>
  )
}
