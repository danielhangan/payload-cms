# Frontend Blog Integration Guide

Working notes for consuming blog data from Payload in the Next.js frontend.

## Collections at a glance
- Blog slugs: `dansvpn-posts`, `dansugcmodels-posts`, `ugchumans-posts`, `clippersdb-posts` (same schema, different brands).
- Support data: `authors` (name, role, bio, avatar, links), `tags` (label, slug, optional color token/hex), `categories` (label, slug, description, icon), `media` (upload with required `alt`).
- All blog collections have public read access; SSR/SSG fetches do not require auth headers.

## Post schema highlights
- Core: `title`, `slug` (auto from title), `status` (`draft`/`published`/`archived`), `publishedDate`, `excerpt`.
- Media: `heroMedia` (upload to `media`), `gallery[]` of `{ media, caption }`.
- Body: `content` is Lexical JSON; render with a Lexical renderer or convert to HTML/React.
- Taxonomy: `author` (single), `tags[]`, `categories[]`.
- Cross-links: `relatedArticles[]` can point to any of the four blog collections (union relation).
- Extras: `externalLinks[]` (`label`, `url`), `embeds[]` (`youtube` | `tweet` | `link` with `url` and optional `title`), `meta` group (`site`, `description`, `originalUrl` for canonical).

## Fetching patterns (server)
```ts
// app/(frontend)/[...]/page.tsx (example)
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { DansvpnPost } from '@/payload-types'

export async function getDansvpnPosts() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'dansvpn-posts',
    depth: 2, // populate relations (media/author/tags/categories/relatedArticles)
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
  })
  return docs as DansvpnPost[]
}
```

REST fallback (no server imports): `GET /api/dansvpn-posts?depth=2&sort=-publishedDate&where[status][equals]=published`

## Frontend mapping tips
- Images: `heroMedia`/`gallery.media` return the upload doc at depth>0; use its `url` plus `alt`.
- Lexical content: plan a renderer component (e.g., `@payloadcms/richtext-lexical/react`) or a custom mapper to blocks/elements.
- Related articles: because relations span multiple collections, inspect `relationTo` to build correct URLs per brand.
- Styling tokens: `tags.color` and `categories.icon` are free-text helpers for badge/icon styling.
- SEO: prefer `meta.description` for page description; fall back to `excerpt`. Use `meta.originalUrl` for canonical if set.
- Sorting/filtering: default sort is `-publishedDate`; filter by `tags.slug`, `categories.slug`, or `author` via `where` clauses.

## Useful references
- Schemas: `src/collections/Blogs.ts`, `src/collections/Authors.ts`, `src/collections/Tags.ts`, `src/collections/Categories.ts`, `src/collections/Media.ts`
- Generated types (importable): `src/payload-types.ts`

