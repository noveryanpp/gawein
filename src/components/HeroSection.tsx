'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA]">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-[#2EBEFA]/20 to-[#0057B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-[#0057B8]/15 to-[#2EBEFA]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#2EBEFA]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-full shadow-lg">
            <span className="w-2 h-2 bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] rounded-full mr-2 animate-pulse"></span>
            <span className="text-[#0057B8] text-sm font-medium">Solusi Teknologi Terkini</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-gray-900 mt-2">Punya masalah website?</span>
            <span className="block bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] bg-clip-text text-transparent">
              Gawe.in
              <span className="inline text-gray-900 mt-2"> aja, Beres!</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ubah ide kamu jadi pengalaman digital yang keren dan bermanfaat! Kami siap bantu bikin
            website, software, dan desain UI/UX yang bikin bisnis kamu makin maju dan nggak ribet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href={'/contact'}>
              <Button size="lg" variant="primary" className="min-w-[200px]">
                Mulai Proyekmu
              </Button>
            </Link>
            <Link href={'/portfolio'}>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Lihat Hasil Kerja Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute rotate-180 bottom-8 text-[#2ebefa] left-1/2 transform -translate-x-1/2 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className="animate-bounce">
          <path fill="#084eb8" d="M9.462 21.192V19.02H6.385q-.403 0-.565-.363q-.162-.364.127-.66l5.456-5.838q.237-.254.593-.254t.6.254l5.455 5.838q.289.296.127.66q-.162.363-.565.363h-3.075v2.173q0 .344-.233.576t-.575.232h-3.462q-.343 0-.575-.232t-.233-.576m1-.173h3.077v-2.192q0-.343.233-.576t.575-.232h2.338l-4.684-5l-4.684 5h2.338q.343 0 .575.233t.233.575zM12 8.25l-5.486 5.867q-.074.07-.173.111t-.196.041q-.32 0-.457-.296q-.138-.296.095-.546l5.62-6.02q.238-.253.595-.253t.598.254l5.621 6.019q.214.25.096.546q-.119.296-.46.296q-.105 0-.2-.035t-.166-.117zm0-4.75L6.514 9.367q-.074.07-.173.111t-.196.041q-.32 0-.457-.296q-.138-.296.095-.546l5.62-6.02q.238-.253.595-.253t.598.254l5.621 6.019q.214.25.096.546q-.119.296-.46.296q-.105 0-.2-.035t-.166-.117zm0 14.52"/>
        </svg>
      </div>
    </section>
  )
}
