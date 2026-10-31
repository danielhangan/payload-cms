import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const DansUGCModelsLeadMagnets: CollectionConfig = {
  slug: 'dansugcmodels-lead-magnets',
  labels: {
    singular: 'Lead Magnet',
    plural: 'Lead Magnets',
  },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'slug', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && data.headline && !data.slug) {
          data.slug = data.headline
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'videoExamples',
      type: 'array',
      admin: {
        description: 'Enter B-roll video IDs from the database',
      },
      fields: [
        {
          name: 'brollId',
          type: 'text',
          required: true,
          admin: {
            description: 'The B-roll video ID from the database',
          },
        },
      ],
    },
    {
      name: 'loopsTransactionalId',
      type: 'text',
      admin: {
        description: 'Loops transactional email template ID',
      },
    },
    {
      name: 'loopsUserGroup',
      type: 'text',
      admin: {
        description: 'Loops user group for email segmentation',
      },
    },
  ],
}
