
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MediaBlockProps {
  media: {
    id: string
    url: string
    alt?: string
    filename?: string
    width?: number
    height?: number
    caption?: any
  }
  className?: string
}

export const MediaBlock: React.FC<MediaBlockProps> = ({ media, className }) => {
  if (!media?.url) {
    return null
  }

  return (
    <div className={cn('my-8', className)}>
      <div className="relative w-full">
        <Image
          src={media.url}
          alt={media.alt || media.filename || 'Media'}
          width={media.width || 800}
          height={media.height || 400}
          className="w-full h-auto rounded-lg border border-gray-200"
        />
      </div>
      {media.caption && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 italic">
            {typeof media.caption === 'string' ? media.caption : ''}
          </p>
        </div>
      )}
    </div>
  )
}
