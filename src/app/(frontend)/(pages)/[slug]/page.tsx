import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { SiteOption } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { Header } from '@/Header/Component'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import Hero from '@/components/Hero'
import Image from 'next/image'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout, images } = page

  return (
    <>
      <article>
        <div className="w-full mx-auto">
          <Header centerNav={false} />
          {images && images.length > 0 && <Hero images={images} logo={siteOptions.siteLogoLight} />}
          <h1 className="border-b-brand-accent-500 border-b-4 text-4xl font-bold font-display text-center p-6 text-white bg-brand-primary-600 sm:text-5xl md:text-6xl">
            {page.title === 'Home' ? 'McBride Military Appreciation BBQ' : page.title}
          </h1>
          <div className="hidden md:block z-50 bg-brand-primary-500 text-white border-b border-blue-950">
            <div className="container max-w-screen-lg p-2 flex flex-wrap justify-between items-center">
              <div className="flex flex-col items-center">
                <h2 className="font-display text-4xl">As seen on</h2>
                <Image src="/american-pickers.jpg" width={120} height={120} alt="American Pickers" />
              </div>
              <div className="flex flex-col items-center">
                <Image src="/come-in-and-visit-our-famous-show.png" width={300} height={200} alt="American Pickers" />
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto shadow-xl ">
            <PageClient />
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />
          </div>
          <div className="bg-white/50">
            <div className="mx-auto w-full">
              <RenderBlocks blocks={layout} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

// @ts-ignore
export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
