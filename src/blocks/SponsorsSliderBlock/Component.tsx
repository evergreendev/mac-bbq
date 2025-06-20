'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { Page } from '@/payload-types'
import Link from 'next/link'

type Props = Extract<Page['layout'][0], { blockType: 'sponsorsSlider' }>

export const SponsorsSliderBlock: React.FC<Props> = (props) => {
  const { sponsors } = props

  const [screenWidth, setScreenWidth] = useState(1000)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  if (!sponsors || sponsors.length === 0) return null

  const sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    draggable: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: Math.min(Math.ceil(screenWidth / 300), sponsors.length),
    adaptiveHeight: false,
    slidesToScroll: 1,
  }

  return (
    <div className="bg-brand-neutral-400 py-8 text-white">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-6">Thank You to Our Sponsors</h2>
        <Slider {...sliderSettings}>
          {sponsors.map((sponsorItem) => {
            const sponsor = sponsorItem
            if (!sponsor || typeof sponsor === "number") return null;
            
            const logo = sponsor.logo
            if (!logo || typeof logo === 'number') return null

            const content = (
              <div key={sponsor.id} className="px-4 text-center">
                <div className="flex justify-center items-center h-32 mb-2">
                  <Image
                    className="max-h-full w-auto object-contain"
                    src={logo.url || ''}
                    alt={sponsor.name || 'Sponsor logo'}
                    width={logo.width || 200}
                    height={logo.height || 200}
                  />
                </div>
                <p className="font-semibold">{sponsor.name}</p>
              </div>
            )

            return sponsor.url ? (
              <Link key={sponsor.id} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                {content}
              </Link>
            ) : (
              content
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default SponsorsSliderBlock
