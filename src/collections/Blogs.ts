import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

const blogSlugs = [
  'dansvpn-posts',
  'dansugcmodels-posts',
  'ugchumans-posts',
  'clippersdb-posts',
] as const

type BlogSlug = (typeof blogSlugs)[number]

const createBlogCollection = ({
  slug,
  label,
  siteURL,
}: {
  slug: BlogSlug
  label: string
  siteURL: string
}): CollectionConfig => ({
  slug,
  labels: {
    singular: `${label} Post`,
    plural: `${label} Posts`,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'author'],
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
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
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
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'array',
      fields: [
        {
          name: 'media',
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
      name: 'relatedArticles',
      label: 'Related Articles',
      type: 'relationship',
      relationTo: blogSlugs as unknown as string[],
      hasMany: true,
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
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'Tweet',
              value: 'tweet',
            },
            {
              label: 'Generic URL',
              value: 'link',
            },
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
          name: 'site',
          type: 'text',
          defaultValue: label,
        },
        {
          name: 'originalUrl',
          type: 'text',
          admin: {
            description: `Optional canonical URL on ${siteURL}`,
          },
        },
      ],
    },
  ],
  defaultSort: '-publishedDate',
})

export const DansVPNPosts = createBlogCollection({
  slug: 'dansvpn-posts',
  label: 'DansVPN',
  siteURL: 'https://dansvpn.com',
})

export const DansUGCModelsPosts = createBlogCollection({
  slug: 'dansugcmodels-posts',
  label: 'DansUGCModels',
  siteURL: 'https://dansugcmodels.com',
})

export const UGCHumansPosts = createBlogCollection({
  slug: 'ugchumans-posts',
  label: 'UGCHumans',
  siteURL: 'https://ugchumans.com',
})

export const ClippersDBPosts = createBlogCollection({
  slug: 'clippersdb-posts',
  label: 'ClippersDB',
  siteURL: 'https://clippersdb.com',
})
