import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'url', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sponsor Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Sponsor Logo',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Sponsor Website URL',
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}
