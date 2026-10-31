import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_dansugcmodels_lead_magnets_video_examples\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_id\` integer,
  	\`thumbnail_id\` integer,
  	\`title\` text,
  	\`emotion\` text,
  	\`platform\` text,
  	\`views\` text,
  	\`video_url\` text,
  	\`thumbnail_url\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_dansugcmodels_lead_magnets_video_examples\`("_order", "_parent_id", "id", "video_id", "thumbnail_id", "title", "emotion", "platform", "views", "video_url", "thumbnail_url") SELECT "_order", "_parent_id", "id", "video_id", "thumbnail_id", "title", "emotion", "platform", "views", "video_url", "thumbnail_url" FROM \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`ALTER TABLE \`__new_dansugcmodels_lead_magnets_video_examples\` RENAME TO \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_order_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_parent_id_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_video_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_thumbnail_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`thumbnail_id\`);`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`category\` text;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`video_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`hero_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`download_file_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`download_url\` text;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`success_page_content_type\` text;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`success_page_download_description\` text;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`success_page_show_video_grid\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`dansugcmodels_lead_magnets\` ADD \`success_page_custom_message\` text;`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_hero_image_idx\` ON \`dansugcmodels_lead_magnets\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_download_file_idx\` ON \`dansugcmodels_lead_magnets\` (\`download_file_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_dansugcmodels_lead_magnets_video_examples\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_url\` text NOT NULL,
  	\`thumbnail_url\` text,
  	\`title\` text,
  	\`views\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_dansugcmodels_lead_magnets_video_examples\`("_order", "_parent_id", "id", "video_url", "thumbnail_url", "title", "views") SELECT "_order", "_parent_id", "id", "video_url", "thumbnail_url", "title", "views" FROM \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`ALTER TABLE \`__new_dansugcmodels_lead_magnets_video_examples\` RENAME TO \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_order_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_parent_id_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_dansugcmodels_lead_magnets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`headline\` text,
  	\`subheadline\` text,
  	\`offer_title\` text,
  	\`loops_user_group\` text,
  	\`loops_transactional_id\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_dansugcmodels_lead_magnets\`("id", "title", "generate_slug", "slug", "status", "headline", "subheadline", "offer_title", "loops_user_group", "loops_transactional_id", "meta_title", "meta_description", "updated_at", "created_at") SELECT "id", "title", "generate_slug", "slug", "status", "headline", "subheadline", "offer_title", "loops_user_group", "loops_transactional_id", "meta_title", "meta_description", "updated_at", "created_at" FROM \`dansugcmodels_lead_magnets\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets\`;`)
  await db.run(sql`ALTER TABLE \`__new_dansugcmodels_lead_magnets\` RENAME TO \`dansugcmodels_lead_magnets\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`dansugcmodels_lead_magnets_slug_idx\` ON \`dansugcmodels_lead_magnets\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_updated_at_idx\` ON \`dansugcmodels_lead_magnets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_created_at_idx\` ON \`dansugcmodels_lead_magnets\` (\`created_at\`);`)
}
