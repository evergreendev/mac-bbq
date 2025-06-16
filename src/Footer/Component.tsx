import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Footer, SiteOption } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption
  const siteLogo = siteOptions.siteLogo

  const navItems = footer?.navItems || []

  return (
    <footer className="bg-brand-neutral-700 text-white">
      <div className="container prose-a:text-white py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          {typeof siteLogo !== 'number' && (
          <Link className="flex items-center" href="/">
            <Image src={siteLogo?.url || ''} alt="Description" width={200} height={200} />
          </Link>
        )}
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-xl" key={i} {...link} />
          })}
        </div>



        <div>
          {footer.content && (
            <RenderBlocks blocks={footer.content} />
          )}
        </div>
      </div>
    </footer>
  )
}
