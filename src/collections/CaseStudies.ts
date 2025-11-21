import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'site', 'status', 'publishedDate', 'clientName'],
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
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'site',
      label: 'Site',
      type: 'select',
      required: true,
      options: [
        { label: 'DansVPN', value: 'dansvpn' },
        { label: 'DansUGCModels', value: 'dansugcmodels' },
        { label: 'UGCHumans', value: 'ugchumans' },
        { label: 'ClippersDB', value: 'clippersdb' },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'industry',
      type: 'text',
    },
    {
      name: 'summary',
      label: 'Summary',
      type: 'textarea',
    },
    {
      name: 'problem',
      label: 'Problem',
      type: 'richText',
    },
    {
      name: 'solution',
      label: 'Solution',
      type: 'richText',
    },
    {
      name: 'results',
      label: 'Results & Metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'group',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
        },
        {
          name: 'personName',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'company',
          type: 'text',
        },
      ],
    },
    {
      name: 'platforms',
      label: 'Platforms',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'budgetRange',
      label: 'Budget Range',
      type: 'text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'relatedPosts',
      label: 'Related Posts',
      type: 'relationship',
      relationTo: [
        'dansvpn-posts',
        'dansugcmodels-posts',
        'ugchumans-posts',
        'clippersdb-posts',
      ],
      hasMany: true,
    },
    {
      name: 'externalLinks',
      label: 'External Links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'embeds',
      label: 'Embeds',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Tweet', value: 'tweet' },
            { label: 'Generic URL', value: 'link' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      name: 'meta',
      label: 'Meta',
      type: 'group',
      fields: [
        {
          name: 'originalUrl',
          type: 'text',
        },
      ],
    },
  ],
  defaultSort: '-publishedDate',
}
