"use client"

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { PortfolioSection } from '@/components/sections/portfolio'
import { ExperienceSection } from '@/components/sections/experience'
import { ContactSection } from '@/components/sections/contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}