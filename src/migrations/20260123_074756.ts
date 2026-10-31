import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`dansugcmodels_lead_magnets_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_stats_order_idx\` ON \`dansugcmodels_lead_magnets_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_stats_parent_id_idx\` ON \`dansugcmodels_lead_magnets_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_lead_magnets_video_examples\` (
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
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_order_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_video_examples_parent_id_idx\` ON \`dansugcmodels_lead_magnets_video_examples\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_lead_magnets_image_examples\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_image_examples_order_idx\` ON \`dansugcmodels_lead_magnets_image_examples\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_image_examples_parent_id_idx\` ON \`dansugcmodels_lead_magnets_image_examples\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_image_examples_image_idx\` ON \`dansugcmodels_lead_magnets_image_examples\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_lead_magnets_offer_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dansugcmodels_lead_magnets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_offer_items_order_idx\` ON \`dansugcmodels_lead_magnets_offer_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_offer_items_parent_id_idx\` ON \`dansugcmodels_lead_magnets_offer_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dansugcmodels_lead_magnets\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`dansugcmodels_lead_magnets_slug_idx\` ON \`dansugcmodels_lead_magnets\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_updated_at_idx\` ON \`dansugcmodels_lead_magnets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dansugcmodels_lead_magnets_created_at_idx\` ON \`dansugcmodels_lead_magnets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`plugin_ai_instructions_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plugin_ai_instructions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plugin_ai_instructions_images_order_idx\` ON \`plugin_ai_instructions_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plugin_ai_instructions_images_parent_id_idx\` ON \`plugin_ai_instructions_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`plugin_ai_instructions_images_image_idx\` ON \`plugin_ai_instructions_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`plugin_ai_instructions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`schema_path\` text,
  	\`field_type\` text DEFAULT 'text',
  	\`relation_to\` text,
  	\`model_id\` text,
  	\`disabled\` integer DEFAULT false,
  	\`prompt\` text,
  	\`system\` text DEFAULT 'INSTRUCTIONS:
  You are a highly skilled and professional blog writer,
  renowned for crafting engaging and well-organized articles.
  When given a title, you meticulously create blogs that are not only
  informative and accurate but also captivating and beautifully structured.',
  	\`layout\` text DEFAULT '[paragraph] - Write a concise introduction (2-3 sentences) that outlines the main topic.
  [horizontalrule] - Insert a horizontal rule to separate the introduction from the main content.
  [list] - Create a list with 3-5 items. Each list item should contain:
     a. [heading] - A brief, descriptive heading (up to 5 words)
     b. [paragraph] - A short explanation or elaboration (1-2 sentences)
  [horizontalrule] - Insert another horizontal rule to separate the main content from the conclusion.
  [paragraph] - Compose a brief conclusion (2-3 sentences) summarizing the key points.
  [quote] - Include a relevant quote from a famous person, directly related to the topic. Format: "Quote text." - Author Name',
  	\`oai_text_settings_model\` text DEFAULT 'gpt-4o-mini',
  	\`oai_text_settings_max_tokens\` numeric DEFAULT 5000,
  	\`oai_text_settings_temperature\` numeric DEFAULT 0.7,
  	\`oai_text_settings_extract_attachments\` integer,
  	\`dalle_e_settings_version\` text DEFAULT 'dall-e-3',
  	\`dalle_e_settings_size\` text DEFAULT '1024x1024',
  	\`dalle_e_settings_style\` text DEFAULT 'natural',
  	\`dalle_e_settings_enable_prompt_optimization\` integer,
  	\`gpt_image_1_settings_version\` text DEFAULT 'gpt-image-1',
  	\`gpt_image_1_settings_size\` text DEFAULT 'auto',
  	\`gpt_image_1_settings_quality\` text DEFAULT 'auto',
  	\`gpt_image_1_settings_output_format\` text DEFAULT 'png',
  	\`gpt_image_1_settings_output_compression\` numeric DEFAULT 100,
  	\`gpt_image_1_settings_background\` text DEFAULT 'white',
  	\`gpt_image_1_settings_moderation\` text DEFAULT 'auto',
  	\`oai_tts_settings_voice\` text DEFAULT 'alloy',
  	\`oai_tts_settings_model\` text DEFAULT 'tts-1',
  	\`oai_tts_settings_response_format\` text DEFAULT 'mp3',
  	\`oai_tts_settings_speed\` numeric DEFAULT 1,
  	\`oai_object_settings_model\` text DEFAULT 'gpt-4o',
  	\`oai_object_settings_max_tokens\` numeric DEFAULT 5000,
  	\`oai_object_settings_temperature\` numeric DEFAULT 0.7,
  	\`oai_object_settings_extract_attachments\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`plugin_ai_instructions_schema_path_idx\` ON \`plugin_ai_instructions\` (\`schema_path\`);`)
  await db.run(sql`CREATE INDEX \`plugin_ai_instructions_updated_at_idx\` ON \`plugin_ai_instructions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`plugin_ai_instructions_created_at_idx\` ON \`plugin_ai_instructions\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`dansugcmodels_lead_magnets_id\` integer REFERENCES dansugcmodels_lead_magnets(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`plugin_ai_instructions_id\` integer REFERENCES plugin_ai_instructions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansugcmodels_lead_magnets_idx\` ON \`payload_locked_documents_rels\` (\`dansugcmodels_lead_magnets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_plugin_ai_instructions_id_idx\` ON \`payload_locked_documents_rels\` (\`plugin_ai_instructions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_stats\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_video_examples\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_image_examples\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets_offer_items\`;`)
  await db.run(sql`DROP TABLE \`dansugcmodels_lead_magnets\`;`)
  await db.run(sql`DROP TABLE \`plugin_ai_instructions_images\`;`)
  await db.run(sql`DROP TABLE \`plugin_ai_instructions\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
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
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "authors_id", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id", "case_studies_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "authors_id", "tags_id", "categories_id", "dansvpn_posts_id", "dansugcmodels_posts_id", "ugchumans_posts_id", "clippersdb_posts_id", "case_studies_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
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
}
