'use client'
import { Media, type Page } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import RichTextClient from '@/components/RichText/index.client'

interface HeroProps {
  images: { id?: string | null | undefined; image?: number | null | Media }[]
  logo?: number | null | Media
  headerText?: Page['headerText']
  location?: string | null
  ticketLink?: string | null
  dates?: string | null
}

const Hero = ({ images, headerText, ticketLink, location, dates }: HeroProps) => {
  const [currImage, setCurrImage] = useState(0)
  const imageMax = images.length - 1
  const intervalId = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrImage(currImage + 1 > imageMax ? 0 : currImage + 1)
    }, 4000)

    return () => clearInterval(intervalId.current || '')
  }, [currImage, imageMax])

  if (
    images[0].image &&
    typeof images[0].image !== 'number' &&
    images[0].image.mimeType === 'video/mp4'
  ) {
    return (
      <video
        className="w-full h-full object-cover aspect-video max-h-[90vh] object-center"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={images[0].image.url || ''} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  return (
    <div className="flex flex-wrap w-full">
      <div className="relative sm:aspect-video max-h-[85vh] w-full overflow-hidden">
        {images.map((image, i) => {
          if (image.image && typeof image.image !== 'number')
            return (
              <div
                key={image.id}
                className={`relative sm:absolute inset-0 duration-700 transition-opacity ${i === currImage ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
              >
                <div className="text-white relative p-4 sm:absolute max-w-screen-md z-20 sm:top-1/2 sm:left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-full text-center">
                  <div className="mb-14">
                    {headerText && <RichTextClient enableGutter={false} content={headerText} />}
                  </div>
                  <div className="w-full border-t border-white">
                    <div className="flex justify-center align-middle gap-4 text-2xl">
                      <h2 className="font-serif grow p-2">{dates}</h2>
                      <div className="self-stretch border-l border-white mx-2"></div>
                      <h2 className="font-serif grow p-2">{location}</h2>
                      <a
                        href={ticketLink || ''}
                        className="font-bold w-52 py-2 px-4 self-center bg-brand-primary-600 hover:text-white"
                      >
                        Get Tickets
                      </a>
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-black bg-opacity-50 z-10`} />
                <Image
                  src={image.image.url || ''}
                  alt={image.image.alt || ''}
                  width={image.image.width || 0}
                  height={image.image.height || 0}
                  className={`z-0 absolute inset-0 duration-700 h-full w-full transition-opacity object-cover object-center`}
                />
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Hero
