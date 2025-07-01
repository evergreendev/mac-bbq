"use client"
import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichTextClient from '@/components/RichText/index.client'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlockClient: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { columns, backgroundStyle, backgroundImage, urlKey } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const backgroundClasses = {
    default: 'bg-white text-black',
    dark: 'bg-brand-neutral-500 text-white',
    light: 'bg-brand-neutral-50 text-gray-900',
    image:
      backgroundImage && typeof backgroundImage !== 'number'
        ? 'bg-cover bg-fixed bg-center text-white max-h-[70vh] aspect-[4/1]'
        : '',
    none: '',
  }

  const appliedBackgroundClasses = backgroundStyle
    ? backgroundClasses[backgroundStyle]
    : backgroundClasses.default

  return (
    <div id={urlKey||undefined}>
      <div
        style={
          backgroundStyle === 'image' && backgroundImage && typeof backgroundImage !== 'number'
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : {}
        }
        className={`w-full relative ${appliedBackgroundClasses} flex items-center`}
      >
        <div className="grid place-items-center grid-cols-4 lg:grid-cols-12 gap-y-10 gap-x-10 p-8  w-full max-w-screen-xl mx-auto z-10 relative">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(
                    `md:prose-h3:text-5xl md:prose-h4:text-2xl md:prose-h2:text-7xl prose-h2:mb-2 
                    prose-h3:mb-2 prose-h2:font-display col-span-4 
                    lg:col-span-${colsSpanClasses[size!]}
                    ${backgroundStyle === 'none' ? 'md:prose-h2:text-3xl prose-p:m-0' : ''}
                    `,
                    {
                      'md:col-span-2': size !== 'full',
                    },
                  )}
                  key={index}
                >
                  {richText && <RichTextClient content={richText} enableGutter={false} />}

                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
        {backgroundStyle === 'image' && (
          <div className="inset-0 bg-slate-900 absolute opacity-50 z-0"></div>
        )}
      </div>
    </div>
  )
}
