import React from 'react'
import { getSinglePortfolioData } from '@/lib/payload'
import { SinglePortfolioContent } from '@/components/SinglePortfolioContent'
import { notFound } from 'next/navigation'

interface SinglePortfolioPageProps {
  params: Promise<{ slug: string }>
}

export default async function SinglePortfolioPage({ params }: SinglePortfolioPageProps) {
  const { slug } = await params
  const data = await getSinglePortfolioData(slug)

  if (!data) {
    notFound()
  }

  return (
    <main>
      <SinglePortfolioContent portfolio={data.portfolio} />
    </main>
  )
}
