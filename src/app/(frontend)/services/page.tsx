import React from 'react'
import { getServicesPageData } from '@/lib/payload'
import { ServicesContent } from '@/components/ServicesContent'

export default async function ServicesPage() {
  const data = await getServicesPageData()

  return (
    <main>
      <ServicesContent services={data.services} />
    </main>
  )
}
