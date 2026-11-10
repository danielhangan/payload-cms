// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite' // database-adapter-import
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Authors } from './collections/Authors'
import { Tags } from './collections/Tags'
import { Categories } from './collections/Categories'
import {
  DansVPNPosts,
  DansUGCModelsPosts,
  UGCHumansPosts,
  ClippersDBPosts,
  HotterPosts,
} from './collections/Blogs'
import { CaseStudies } from './collections/CaseStudies'
import { DansUGCModelsLeadMagnets } from './collections/DansUGCModelsLeadMagnets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined
  } catch {
    return undefined
  }
}

// True when running the payload or next CLI (migrate, generate, build) rather than the Worker
const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  if (!resolved) return false
  return (
    resolved.endsWith(path.join('payload', 'bin.js')) ||
    resolved.endsWith(path.join('next', 'dist', 'bin', 'next'))
  )
})
const isProduction = process.env.NODE_ENV === 'production'

// Workers logs read best as one JSON object per line
const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " · Dan's CMS",
      description: 'Blog and page content for DansUGC, DansVPN, UGCHumans and ClippersDB',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
      beforeDashboard: ['/components/admin/SiteOverview'],
    },
  },
  // Order sets the admin nav and dashboard group order (no effect on the database)
  collections: [
    DansUGCModelsPosts,
    CaseStudies,
    DansUGCModelsLeadMagnets,
    HotterPosts,
    DansVPNPosts,
    UGCHumansPosts,
    ClippersDBPosts,
    Media,
    Authors,
    Tags,
    Categories,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  // Schema changes go through migrations only (pnpm payload migrate:create). Dev auto-push caused
  // the schema drift found during the 3.93 upgrade, so it stays off.
  db: sqliteD1Adapter({ binding: cloudflare.env.D1, push: false }),
  // database-adapter-config-end
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    // storage-adapter-placeholder
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
