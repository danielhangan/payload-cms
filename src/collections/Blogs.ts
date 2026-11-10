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
  displayName,
  group,
  siteURL,
  domain,
}: {
  slug: BlogSlug
  /** Stored as the default `meta.site` value, so keep it stable */
  label: string
  /** What the admin shows */
  displayName: string
  group: string
  siteURL: string
  /** Public domain shown in the admin, when it differs from siteURL */
  domain?: string
}): CollectionConfig => ({
  slug,
  labels: {
    singular: `${displayName} post`,
    plural: `${displayName} blog`,
  },
  admin: {
    group,
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'author'],
    description: `Articles published on ${domain ?? siteURL.replace('https://', '')}`,
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
      admin: {
        components: { Cell: '/components/admin/StatusCell' },
      },
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
      relationTo: blogSlugs as any,
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
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Optional SEO description used for link previews.',
          },
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
  displayName: 'DansVPN',
  group: 'Other sites',
  siteURL: 'https://dansvpn.com',
})

export const DansUGCModelsPosts = createBlogCollection({
  slug: 'dansugcmodels-posts',
  label: 'DansUGCModels',
  displayName: 'DansUGC',
  group: 'DansUGC',
  siteURL: 'https://dansugcmodels.com',
  domain: 'dansugc.com',
})

export const UGCHumansPosts = createBlogCollection({
  slug: 'ugchumans-posts',
  label: 'UGCHumans',
  displayName: 'UGCHumans',
  group: 'Other sites',
  siteURL: 'https://ugchumans.com',
})

export const ClippersDBPosts = createBlogCollection({
  slug: 'clippersdb-posts',
  label: 'ClippersDB',
  displayName: 'ClippersDB',
  group: 'Other sites',
  siteURL: 'https://clippersdb.com',
})
