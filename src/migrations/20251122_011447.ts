import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`authors_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`authors_links_order_idx\` ON \`authors_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`authors_links_parent_id_idx\` ON \`authors_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`authors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`bio\` text,
  	\`avatar_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`authors_avatar_idx\` ON \`authors\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`authors_updated_at_idx\` ON \`authors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`authors_created_at_idx\` ON \`authors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`color\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`icon\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`dansvpn_posts_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_gallery_order_idx\` ON \`dansvpn_posts_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_gallery_parent_id_idx\` ON \`dansvpn_posts_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_gallery_media_idx\` ON \`dansvpn_posts_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`dansvpn_posts_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_external_links_order_idx\` ON \`dansvpn_posts_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_external_links_parent_id_idx\` ON \`dansvpn_posts_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansvpn_posts_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_embeds_order_idx\` ON \`dansvpn_posts_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_embeds_parent_id_idx\` ON \`dansvpn_posts_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansvpn_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`hero_media_id\` integer,
  	\`excerpt\` text,
  	\`content\` text,
  	\`author_id\` integer,
  	\`meta_site\` text DEFAULT 'DansVPN',
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dansvpn_posts_slug_idx\` ON \`dansvpn_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_hero_media_idx\` ON \`dansvpn_posts\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_author_idx\` ON \`dansvpn_posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_updated_at_idx\` ON \`dansvpn_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_created_at_idx\` ON \`dansvpn_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`dansvpn_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_order_idx\` ON \`dansvpn_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_parent_idx\` ON \`dansvpn_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_path_idx\` ON \`dansvpn_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_tags_id_idx\` ON \`dansvpn_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_categories_id_idx\` ON \`dansvpn_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_dansvpn_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_dansugcmodels_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_ugchumans_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_clippersdb_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_posts_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_gallery_order_idx\` ON \`dansugcmodels_posts_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_gallery_parent_id_idx\` ON \`dansugcmodels_posts_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_gallery_media_idx\` ON \`dansugcmodels_posts_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_posts_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_external_links_order_idx\` ON \`dansugcmodels_posts_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_external_links_parent_id_idx\` ON \`dansugcmodels_posts_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_posts_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_embeds_order_idx\` ON \`dansugcmodels_posts_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_embeds_parent_id_idx\` ON \`dansugcmodels_posts_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`hero_media_id\` integer,
  	\`excerpt\` text,
  	\`content\` text,
  	\`author_id\` integer,
  	\`meta_site\` text DEFAULT 'DansUGCModels',
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dansugcmodels_posts_slug_idx\` ON \`dansugcmodels_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_hero_media_idx\` ON \`dansugcmodels_posts\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_author_idx\` ON \`dansugcmodels_posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_updated_at_idx\` ON \`dansugcmodels_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_created_at_idx\` ON \`dansugcmodels_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_order_idx\` ON \`dansugcmodels_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_parent_idx\` ON \`dansugcmodels_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_path_idx\` ON \`dansugcmodels_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_tags_id_idx\` ON \`dansugcmodels_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_categories_id_idx\` ON \`dansugcmodels_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_dansvpn_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_dansugcmodels_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_ugchumans_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_clippersdb_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`ugchumans_posts_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_gallery_order_idx\` ON \`ugchumans_posts_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_gallery_parent_id_idx\` ON \`ugchumans_posts_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_gallery_media_idx\` ON \`ugchumans_posts_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`ugchumans_posts_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_external_links_order_idx\` ON \`ugchumans_posts_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_external_links_parent_id_idx\` ON \`ugchumans_posts_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ugchumans_posts_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_embeds_order_idx\` ON \`ugchumans_posts_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_embeds_parent_id_idx\` ON \`ugchumans_posts_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ugchumans_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`hero_media_id\` integer,
  	\`excerpt\` text,
  	\`content\` text,
  	\`author_id\` integer,
  	\`meta_site\` text DEFAULT 'UGCHumans',
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ugchumans_posts_slug_idx\` ON \`ugchumans_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_hero_media_idx\` ON \`ugchumans_posts\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_author_idx\` ON \`ugchumans_posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_updated_at_idx\` ON \`ugchumans_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_created_at_idx\` ON \`ugchumans_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ugchumans_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_order_idx\` ON \`ugchumans_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_parent_idx\` ON \`ugchumans_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_path_idx\` ON \`ugchumans_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_tags_id_idx\` ON \`ugchumans_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_categories_id_idx\` ON \`ugchumans_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_dansvpn_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_dansugcmodels_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_ugchumans_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_clippersdb_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`clippersdb_posts_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_gallery_order_idx\` ON \`clippersdb_posts_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_gallery_parent_id_idx\` ON \`clippersdb_posts_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_gallery_media_idx\` ON \`clippersdb_posts_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`clippersdb_posts_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_external_links_order_idx\` ON \`clippersdb_posts_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_external_links_parent_id_idx\` ON \`clippersdb_posts_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clippersdb_posts_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_embeds_order_idx\` ON \`clippersdb_posts_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_embeds_parent_id_idx\` ON \`clippersdb_posts_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clippersdb_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`hero_media_id\` integer,
  	\`excerpt\` text,
  	\`content\` text,
  	\`author_id\` integer,
  	\`meta_site\` text DEFAULT 'ClippersDB',
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`clippersdb_posts_slug_idx\` ON \`clippersdb_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_hero_media_idx\` ON \`clippersdb_posts\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_author_idx\` ON \`clippersdb_posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_updated_at_idx\` ON \`clippersdb_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_created_at_idx\` ON \`clippersdb_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`clippersdb_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_order_idx\` ON \`clippersdb_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_parent_idx\` ON \`clippersdb_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_path_idx\` ON \`clippersdb_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_tags_id_idx\` ON \`clippersdb_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_categories_id_idx\` ON \`clippersdb_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_dansvpn_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_dansugcmodels_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_ugchumans_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_clippersdb_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_results\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_results_order_idx\` ON \`case_studies_results\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_results_parent_id_idx\` ON \`case_studies_results\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_platforms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_platforms_order_idx\` ON \`case_studies_platforms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_platforms_parent_id_idx\` ON \`case_studies_platforms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_external_links_order_idx\` ON \`case_studies_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_external_links_parent_id_idx\` ON \`case_studies_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_embeds_order_idx\` ON \`case_studies_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_embeds_parent_id_idx\` ON \`case_studies_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`site\` text NOT NULL,
  	\`published_date\` text,
  	\`hero_media_id\` integer,
  	\`client_name\` text NOT NULL,
  	\`industry\` text,
  	\`summary\` text,
  	\`problem\` text,
  	\`solution\` text,
  	\`testimonial_quote\` text,
  	\`testimonial_person_name\` text,
  	\`testimonial_role\` text,
  	\`testimonial_company\` text,
  	\`budget_range\` text,
  	\`author_id\` integer,
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_hero_media_idx\` ON \`case_studies\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_author_idx\` ON \`case_studies\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_tags_id_idx\` ON \`case_studies_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_categories_id_idx\` ON \`case_studies_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_dansvpn_posts_id_idx\` ON \`case_studies_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_dansugcmodels_posts_id_idx\` ON \`case_studies_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_ugchumans_posts_id_idx\` ON \`case_studies_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_clippersdb_posts_id_idx\` ON \`case_studies_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`authors_id\` integer REFERENCES authors(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tags_id\` integer REFERENCES tags(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`categories_id\` integer REFERENCES categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`dansvpn_posts_id\` integer REFERENCES dansvpn_posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`dansugcmodels_posts_id\` integer REFERENCES dansugcmodels_posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`ugchumans_posts_id\` integer REFERENCES ugchumans_posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`clippersdb_posts_id\` integer REFERENCES clippersdb_posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansvpn_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansugcmodels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ugchumans_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clippersdb_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`authors_links\`;`)
  await db.run(sql`DROP TABLE \`authors\`;`)
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts_gallery\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts_external_links\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts_embeds\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts_gallery\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts_external_links\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts_embeds\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts_gallery\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts_external_links\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts_embeds\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts_gallery\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts_external_links\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts_embeds\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_results\`;`)
  await db.run(sql`DROP TABLE \`case_studies_platforms\`;`)
  await db.run(sql`DROP TABLE \`case_studies_external_links\`;`)
  await db.run(sql`DROP TABLE \`case_studies_embeds\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
