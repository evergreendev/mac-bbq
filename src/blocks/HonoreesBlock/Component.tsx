import React from 'react'
import Image from 'next/image'
import { cn } from 'src/utilities/cn'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'honoreesBlock' }>

export const HonoreesBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { heading, subheading, honorees, backgroundStyle } = props

  const backgroundClasses = {
    dark: 'bg-brand-neutral-500 text-white',
    light: 'bg-brand-neutral-50 text-gray-900',
    none: '',
  }

  const appliedBackgroundClasses = backgroundStyle
    ? backgroundClasses[backgroundStyle]
    : backgroundClasses.light

  return (
    <div className={`w-full py-12 ${appliedBackgroundClasses}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl">{subheading}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {honorees && honorees.map((honoree, index) => {
            // Check if honoree is a number (ID) or an object
            if (typeof honoree === 'number') return null
            
            const { name, title, image, description } = honoree
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                {image && typeof image !== 'number' && (
                  <div className="w-full h-64 relative">
                    <Image
                      src={image.url}
                      alt={image.alt || `Photo of ${name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{name}</h3>
                  <p className="text-brand-primary-600 font-semibold mb-4">{title}</p>
                  {description && <p className="text-gray-700">{description}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
