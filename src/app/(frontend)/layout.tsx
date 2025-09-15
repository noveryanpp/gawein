import React from 'react'
import './styles.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Punya masalah website? Gawe.in aja, Beres!',
  title: 'Gawe.in - Jasa Pembuatan Website',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
