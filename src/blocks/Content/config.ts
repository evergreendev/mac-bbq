import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature, HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor, OrderedListFeature, ParagraphFeature, UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { LinkBlock } from '@/blocks/LinkBlock/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          AlignFeature(),
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [MediaBlock, FormBlock, LinkBlock] }),
          OrderedListFeature(),
          UnorderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          AlignFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_: any, { enableLink }: any) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'light',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Image',
          value: 'image',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData.backgroundStyle === 'image',
      },
    },
  ],
}
