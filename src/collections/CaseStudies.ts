import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    group: 'DansUGC',
    description: 'Customer stories, shown on the site picked in each entry',
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
      admin: {
        components: { Cell: '/components/admin/StatusCell' },
      },
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
      name: 'appLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'App Logo',
      admin: {
        description:
          'Square logo of the case study subject (app / brand). Recommended: 512×512 PNG with transparent background.',
      },
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
      name: 'about',
      label: 'About',
      type: 'richText',
      admin: {
        description: 'About the client / app — who they are and what they do.',
      },
    },
    {
      name: 'challenge',
      label: 'The Challenge',
      type: 'richText',
      admin: {
        description: 'What problem or challenge did they face before using DansUGC?',
      },
    },
    {
      name: 'howTheyUsedDansUGC',
      label: 'How They Used DansUGC',
      type: 'richText',
      admin: {
        description: 'How they leveraged DansUGC to solve their challenge.',
      },
    },
    {
      name: 'resultsAchieved',
      label: 'Results Achieved with DansUGC',
      type: 'richText',
      admin: {
        description: 'The outcomes and results they achieved.',
      },
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
      name: 'creatives',
      label: 'Creatives',
      type: 'array',
      admin: {
        description: 'Showcase cards for individual video creatives with performance metrics.',
      },
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'views',
          type: 'text',
          admin: {
            description: 'e.g. "2.4m"',
          },
        },
        {
          name: 'saves',
          type: 'text',
          admin: {
            description: 'e.g. "11k"',
          },
        },
        {
          name: 'thumbstopRate',
          label: 'Thumbstop Rate',
          type: 'text',
          admin: {
            description: 'e.g. "37%"',
          },
        },
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
      ],
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
