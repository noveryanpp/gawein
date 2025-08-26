import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ServicesSection } from '@/components/ServicesSection'
import { CTASection } from '@/components/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </main>
  )
}
