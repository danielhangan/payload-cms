import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`dansvpn_posts\` ADD COLUMN \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_posts\` ADD COLUMN \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`ugchumans_posts\` ADD COLUMN \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`clippersdb_posts\` ADD COLUMN \`meta_description\` text;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`dansvpn_posts\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_posts\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`ugchumans_posts\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`clippersdb_posts\` DROP COLUMN \`meta_description\`;`)
}
