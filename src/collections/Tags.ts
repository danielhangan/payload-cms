import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'color'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Optional color token or hex for front-end styling',
      },
    },
  ],
}
