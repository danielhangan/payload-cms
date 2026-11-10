import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`hotter_posts_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hotter_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hotter_posts_gallery_order_idx\` ON \`hotter_posts_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_gallery_parent_id_idx\` ON \`hotter_posts_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_gallery_media_idx\` ON \`hotter_posts_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`hotter_posts_external_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hotter_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hotter_posts_external_links_order_idx\` ON \`hotter_posts_external_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_external_links_parent_id_idx\` ON \`hotter_posts_external_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hotter_posts_embeds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hotter_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hotter_posts_embeds_order_idx\` ON \`hotter_posts_embeds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_embeds_parent_id_idx\` ON \`hotter_posts_embeds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hotter_posts\` (
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
  	\`meta_site\` text DEFAULT '75 Hotter',
  	\`meta_description\` text,
  	\`meta_original_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`hotter_posts_slug_idx\` ON \`hotter_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_hero_media_idx\` ON \`hotter_posts\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_author_idx\` ON \`hotter_posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_updated_at_idx\` ON \`hotter_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_created_at_idx\` ON \`hotter_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hotter_posts_rels\` (
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
  	\`hotter_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`hotter_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hotter_posts_id\`) REFERENCES \`hotter_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_order_idx\` ON \`hotter_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_parent_idx\` ON \`hotter_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_path_idx\` ON \`hotter_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_tags_id_idx\` ON \`hotter_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_categories_id_idx\` ON \`hotter_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_dansvpn_posts_id_idx\` ON \`hotter_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_dansugcmodels_posts_id_idx\` ON \`hotter_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_ugchumans_posts_id_idx\` ON \`hotter_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_clippersdb_posts_id_idx\` ON \`hotter_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`hotter_posts_rels_hotter_posts_id_idx\` ON \`hotter_posts_rels\` (\`hotter_posts_id\`);`)
  await db.run(sql`ALTER TABLE \`dansvpn_posts_rels\` ADD \`hotter_posts_id\` integer REFERENCES hotter_posts(id);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_hotter_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`hotter_posts_id\`);`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_posts_rels\` ADD \`hotter_posts_id\` integer REFERENCES hotter_posts(id);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_hotter_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`hotter_posts_id\`);`)
  await db.run(sql`ALTER TABLE \`ugchumans_posts_rels\` ADD \`hotter_posts_id\` integer REFERENCES hotter_posts(id);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_hotter_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`hotter_posts_id\`);`)
  await db.run(sql`ALTER TABLE \`clippersdb_posts_rels\` ADD \`hotter_posts_id\` integer REFERENCES hotter_posts(id);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_hotter_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`hotter_posts_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`hotter_posts_id\` integer REFERENCES hotter_posts(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hotter_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`hotter_posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`hotter_posts_gallery\`;`)
  await db.run(sql`DROP TABLE \`hotter_posts_external_links\`;`)
  await db.run(sql`DROP TABLE \`hotter_posts_embeds\`;`)
  await db.run(sql`DROP TABLE \`hotter_posts\`;`)
  await db.run(sql`DROP TABLE \`hotter_posts_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_dansugcmodels_posts_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_dansugcmodels_posts_rels\`("id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id") SELECT "id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id" FROM \`dansugcmodels_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_dansugcmodels_posts_rels\` RENAME TO \`dansugcmodels_posts_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_order_idx\` ON \`dansugcmodels_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_parent_idx\` ON \`dansugcmodels_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_path_idx\` ON \`dansugcmodels_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_tags_id_idx\` ON \`dansugcmodels_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_categories_id_idx\` ON \`dansugcmodels_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_dansvpn_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_dansugcmodels_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_ugchumans_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_posts_rels_clippersdb_posts_id_idx\` ON \`dansugcmodels_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_dansvpn_posts_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_dansvpn_posts_rels\`("id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id") SELECT "id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id" FROM \`dansvpn_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`dansvpn_posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_dansvpn_posts_rels\` RENAME TO \`dansvpn_posts_rels\`;`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_order_idx\` ON \`dansvpn_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_parent_idx\` ON \`dansvpn_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_path_idx\` ON \`dansvpn_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_tags_id_idx\` ON \`dansvpn_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_categories_id_idx\` ON \`dansvpn_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_dansvpn_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_dansugcmodels_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_ugchumans_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`dansvpn_posts_rels_clippersdb_posts_id_idx\` ON \`dansvpn_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_ugchumans_posts_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_ugchumans_posts_rels\`("id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id") SELECT "id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id" FROM \`ugchumans_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`ugchumans_posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_ugchumans_posts_rels\` RENAME TO \`ugchumans_posts_rels\`;`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_order_idx\` ON \`ugchumans_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_parent_idx\` ON \`ugchumans_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_path_idx\` ON \`ugchumans_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_tags_id_idx\` ON \`ugchumans_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_categories_id_idx\` ON \`ugchumans_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_dansvpn_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_dansugcmodels_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_ugchumans_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`ugchumans_posts_rels_clippersdb_posts_id_idx\` ON \`ugchumans_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_clippersdb_posts_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_clippersdb_posts_rels\`("id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id") SELECT "id", "order", "parent_id", "path", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id" FROM \`clippersdb_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`clippersdb_posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_clippersdb_posts_rels\` RENAME TO \`clippersdb_posts_rels\`;`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_order_idx\` ON \`clippersdb_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_parent_idx\` ON \`clippersdb_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_path_idx\` ON \`clippersdb_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_tags_id_idx\` ON \`clippersdb_posts_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_categories_id_idx\` ON \`clippersdb_posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_dansvpn_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_dansugcmodels_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_ugchumans_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`clippersdb_posts_rels_clippersdb_posts_id_idx\` ON \`clippersdb_posts_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`authors_id\` integer,
  	\`tags_id\` integer,
  	\`categories_id\` integer,
  	\`dansvpn_posts_id\` integer,
  	\`dansugcmodels_posts_id\` integer,
  	\`ugchumans_posts_id\` integer,
  	\`clippersdb_posts_id\` integer,
  	\`case_studies_id\` integer,
  	\`dansugcmodels_lead_magnets_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`authors_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansvpn_posts_id\`) REFERENCES \`dansvpn_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_posts_id\`) REFERENCES \`dansugcmodels_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ugchumans_posts_id\`) REFERENCES \`ugchumans_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clippersdb_posts_id\`) REFERENCES \`clippersdb_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dansugcmodels_lead_magnets_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "authors_id", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id", "case_studies_id", "dansugcmodels_lead_magnets_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "authors_id", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id", "case_studies_id", "dansugcmodels_lead_magnets_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansvpn_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`dansvpn_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansugcmodels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`dansugcmodels_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ugchumans_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`ugchumans_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clippersdb_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`clippersdb_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansugcmodels_lead_magnets_idx\` ON \`payload_locked_documents_rels\` (\`dansugcmodels_lead_magnets_id\`);`)
}
