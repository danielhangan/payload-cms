import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const DansUGCModelsLeadMagnets: CollectionConfig = {
  slug: 'dansugcmodels-lead-magnets',
  labels: {
    singular: 'Lead Magnet',
    plural: 'Lead Magnets',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
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
      name: 'headline',
      type: 'text',
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      name: 'videoExamples',
      type: 'array',
      fields: [
        {
          name: 'videoUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'thumbnailUrl',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'views',
          type: 'text',
        },
      ],
    },
    {
      name: 'imageExamples',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'offerTitle',
      type: 'text',
    },
    {
      name: 'offerItems',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'loopsUserGroup',
      type: 'text',
      admin: {
        description: 'Tag for email segmentation',
      },
    },
    {
      name: 'loopsTransactionalId',
      type: 'text',
      admin: {
        description: 'Email template ID',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO description',
      },
    },
  ],
}
