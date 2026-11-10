import type { CollectionSlug, Payload } from 'payload'
import React from 'react'

type Props = { payload: Payload }

const SITES: { slug: CollectionSlug; name: string; domain: string; daily?: boolean }[] = [
  { slug: 'dansugcmodels-posts', name: 'DansUGC', domain: 'dansugc.com', daily: true },
  { slug: 'dansvpn-posts', name: 'DansVPN', domain: 'dansvpn.com' },
  { slug: 'ugchumans-posts', name: 'UGCHumans', domain: 'ugchumans.com' },
  { slug: 'clippersdb-posts', name: 'ClippersDB', domain: 'clippersdb.com' },
]

const DAY = 24 * 60 * 60 * 1000

function daysAgo(iso?: string | null): number | null {
  if (!iso) return null
  return Math.floor((Date.now() - new Date(iso).getTime()) / DAY)
}

function ago(days: number | null): string {
  if (days === null) return 'Never'
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

async function siteStats(payload: Payload, slug: CollectionSlug) {
  const since = new Date(Date.now() - 30 * DAY).toISOString()
  const [published, drafts, last30, latest] = await Promise.all([
    payload.count({ collection: slug, where: { status: { equals: 'published' } } }),
    payload.count({ collection: slug, where: { status: { equals: 'draft' } } }),
    payload.count({
      collection: slug,
      where: { and: [{ status: { equals: 'published' } }, { publishedDate: { greater_than: since } }] },
    }),
    payload.find({
      collection: slug,
      where: { status: { equals: 'published' } },
      sort: '-publishedDate',
      limit: 1,
      depth: 0,
      select: { title: true, publishedDate: true },
    }),
  ])
  const last = latest.docs[0] as { id: number | string; title?: string; publishedDate?: string } | undefined
  return {
    published: published.totalDocs,
    drafts: drafts.totalDocs,
    last30: last30.totalDocs,
    last,
    days: daysAgo(last?.publishedDate),
  }
}

// Dashboard header: how each blog is doing, and whether the daily DansUGC article is still going out.
export default async function SiteOverview({ payload }: Props) {
  const stats = await Promise.all(SITES.map((s) => siteStats(payload, s.slug)))
  const recent = (
    await Promise.all(
      SITES.map((s) =>
        payload
          .find({
            collection: s.slug,
            sort: '-updatedAt',
            limit: 4,
            depth: 0,
            select: { title: true, status: true, updatedAt: true },
          })
          .then((r) => r.docs.map((d) => ({ ...(d as any), site: s })))
      ),
    )
  )
    .flat()
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6)

  const ugc = stats[0]
  const engineHealthy = ugc.days !== null && ugc.days <= 2

  return (
    <section className="dcms-overview">
      <header className="dcms-overview__head">
        <div>
          <p className="dcms-eyebrow">Overview</p>
          <h1 className="dcms-overview__title">Content across your sites</h1>
        </div>
        <div className={`dcms-engine ${engineHealthy ? 'dcms-engine--ok' : 'dcms-engine--late'}`}>
          <span className="dcms-engine__dot" aria-hidden="true" />
          <span>
            <strong>Daily DansUGC article</strong>
            <span className="dcms-engine__detail">
              {ugc.days === null
                ? 'Nothing published yet'
                : `${engineHealthy ? 'On track' : 'Paused'}: last post ${ugc.days} day${ugc.days === 1 ? '' : 's'} ago`}
            </span>
          </span>
        </div>
      </header>

      <div className="dcms-sites">
        {SITES.map((site, i) => {
          const s = stats[i]
          return (
            <a key={site.slug} className="dcms-site" href={`/admin/collections/${site.slug}`}>
              <div className="dcms-site__top">
                <span className="dcms-site__name">{site.name}</span>
                <span className="dcms-site__domain">{site.domain}</span>
              </div>
              <div className="dcms-site__big">{s.published}</div>
              <div className="dcms-site__label">published posts</div>
              <dl className="dcms-site__meta">
                <div>
                  <dt>30 days</dt>
                  <dd>{s.last30}</dd>
                </div>
                <div>
                  <dt>Drafts</dt>
                  <dd>{s.drafts}</dd>
                </div>
                <div>
                  <dt>Last post</dt>
                  <dd>{ago(s.days)}</dd>
                </div>
              </dl>
            </a>
          )
        })}
      </div>

      {recent.length > 0 && (
        <div className="dcms-recent">
          <h2 className="dcms-recent__title">Recently edited</h2>
          <ul>
            {recent.map((d) => (
              <li key={`${d.site.slug}-${d.id}`}>
                <a href={`/admin/collections/${d.site.slug}/${d.id}`}>
                  <span className="dcms-recent__site">{d.site.name}</span>
                  <span className="dcms-recent__name">{d.title}</span>
                  <span className={`dcms-status dcms-status--${d.status}`}>{d.status}</span>
                  <span className="dcms-recent__date">{fmt(d.updatedAt)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  )
}
