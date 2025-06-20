import type { Block } from 'payload'

export const SponsorsSliderBlock: Block = {
  slug: 'sponsorsSlider',
  interfaceName: 'SponsorsSliderBlock',
  fields: [
    {
      name: "sponsors",
      type: "relationship",
      relationTo: "sponsors",
      hasMany: true,
      required: true,
    },
  ],
}
