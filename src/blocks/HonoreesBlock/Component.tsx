'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from 'src/utilities/cn'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'honoreesBlock' }>

export const HonoreesBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  // Custom CSS for the slider
  const sliderStyles = `
    .honorees-slider .slick-prev,
    .honorees-slider .slick-next {
      z-index: 10;
      width: 40px;
      height: 40px;
    }
    .honorees-slider .slick-prev {
      left: -5px;
    }
    .honorees-slider .slick-next {
      right: -5px;
    }
    .honorees-slider .slick-prev:before,
    .honorees-slider .slick-next:before {
      font-size: 40px;
      opacity: 0.75;
    }
    .honorees-slider .slick-dots {
      bottom: -40px;
    }
    .honorees-slider .slick-track {
      display: flex;
      align-items: stretch;
    }
    .honorees-slider .slick-slide {
      height: auto;
    }
    .honorees-slider .slick-slide > div {
      height: 100%;
    }
  `;
  const { heading, subheading, honorees, backgroundStyle, urlKey } = props
  const [screenWidth, setScreenWidth] = useState(1000)

  useEffect(() => {
    setScreenWidth(window.innerWidth)

    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const backgroundClasses = {
    dark: 'bg-brand-neutral-500 text-white',
    light: 'bg-brand-neutral-50 text-gray-900',
    none: 'bg-brand-accent-500 text-white',
  }

  const appliedBackgroundClasses = backgroundStyle
    ? backgroundClasses[backgroundStyle]
    : backgroundClasses.light

  const sliderSettings = {
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: honorees?.length > 1,
    draggable: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: Math.min(
      screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3, 
      honorees?.length || 1
    ),
    adaptiveHeight: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, honorees?.length || 1),
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  return (
    <div id={urlKey||undefined} className={`w-full py-12 ${appliedBackgroundClasses}`}>
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl">{subheading}</p>}
        </div>

        <Slider {...sliderSettings} className="honorees-slider">
          {honorees && honorees.map((honoree, index) => {
            // Check if honoree is a number (ID) or an object
            if (typeof honoree === 'number') return null

            const { name, title, image, description } = honoree

            return (
              <div 
                key={index} 
                className="px-4"
              >
                <div className="flex flex-col items-center text-black bg-white rounded-lg shadow-lg overflow-hidden transition-transform h-full">
                  {image && typeof image !== 'number' && (
                    <div className="w-full aspect-[2/3] relative">
                      <Image
                        src={image.url||""}
                        alt={image.alt || `Photo of ${name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 text-center flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{name}</h3>
                    <p className="text-brand-primary-600 font-semibold mb-4">{title}</p>
                    {description && <p className="text-gray-700">{description}</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
