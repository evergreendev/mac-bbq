import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Honorees: CollectionConfig = {
  slug: 'honorees',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Honoree Name',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Honoree Title/Position',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Honoree Image',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}
