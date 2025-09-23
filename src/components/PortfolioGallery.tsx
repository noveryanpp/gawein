'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FullPortfolio } from '@/lib/payload'

interface PortfolioGalleryProps {
  gallery: FullPortfolio['gallery']
  mainImage?: FullPortfolio['image']
}

export const PortfolioGallery = ({ gallery, mainImage }: PortfolioGalleryProps) => {

  const allImages = mainImage ? [{ image: mainImage, caption: null }, ...gallery] : gallery
  const [selectedIndex, setSelectedIndex] = useState(0)


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedIndex(selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedIndex(selectedIndex === allImages.length - 1 ? 0 : selectedIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, allImages.length])

  if (!allImages || allImages.length === 0) {
    return null
  }

  const selectedItem = allImages[selectedIndex]
  const selectedImage = allImages[selectedIndex]?.image

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Galeri Proyek
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat berbagai tampilan dan fitur dari proyek ini
          </p>
        </div>

        <div className="space-y-8">
          {/* Main Image Display */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
            <div className="aspect-video">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
              {selectedIndex + 1} / {allImages.length}
            </div>

            {/* Image Caption */}
            { selectedItem.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-lg font-semibold">
                  {selectedItem.caption}
                </h3>
              </div>
            )}

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedIndex(selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setSelectedIndex(selectedIndex === allImages.length - 1 ? 0 : selectedIndex + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4">
              <div className="flex gap-4 mx-auto">
                {allImages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === selectedIndex
                        ? 'border-[#2EBEFA]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={128}
                      height={80}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        index === selectedIndex ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                      }`}
                    />

                    {/* Selected overlay with darker effect */}
                    {index === selectedIndex && (
                      <div className="absolute inset-0 bg-[#2EBEFA]/30 flex items-center justify-center">
                        {/*<div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>*/}
                      </div>
                    )}

                    {/* Darkening effect for non-selected images */}
                    {index !== selectedIndex && (
                      <div className="absolute inset-0 bg-black/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard Navigation Hint */}
          {allImages.length > 1 && (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Gunakan tombol panah ← → pada keyboard untuk navigasi
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
