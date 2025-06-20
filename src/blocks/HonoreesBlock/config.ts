import type { Block } from 'payload'
import KeyField from '@/blocks/KeyField'

export const HonoreesBlock: Block = {
  slug: 'honoreesBlock',
  interfaceName: 'HonoreesBlock',
  fields: [
    KeyField,
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'Our Honorees',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading',
    },
    {
      name: 'honorees',
      type: 'relationship',
      relationTo: 'honorees',
      hasMany: true,
      required: true,
      label: 'Select Honorees',
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
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
    },
  ],
}
