import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import IFrameBlock from '@/blocks/IFrame/Component'
import { LinkBlock } from '@/blocks/LinkBlock/Component'
import { ImageSliderBlock } from '@/blocks/ImageSliderBlock/Component'

const blockComponents = {
  content: ContentBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  IFrame: IFrameBlock,
  linkBlock: LinkBlock,
  imageSlider: ImageSliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType] as React.ComponentType<typeof block>

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
