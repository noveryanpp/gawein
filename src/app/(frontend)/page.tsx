import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ServicesSection } from '@/components/ServicesSection'
import { PortfolioSection } from '@/components/PortfolioSection'
import { CTASection } from '@/components/CTASection'
import { getHomePageData } from '@/lib/payload'

export default function HomePage() {

  return (
    <main>
      <HomePageContent />
    </main>
  )
}

const HomePageContent = async () => {
  const { services, portfolios, socials } = await getHomePageData()
  console.log('Social Links:', socials)
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <PortfolioSection portfolios={portfolios}/>
      <CTASection socials={socials}/>
    </>
  )
}