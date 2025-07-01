import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'linkBlock' }>

export const LinkBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links }) => {
  if (!links || !links.length) return null
  return <CMSLink className="grow w-full sm:w-auto flex" size="lg" {...links[0].link} />
}
