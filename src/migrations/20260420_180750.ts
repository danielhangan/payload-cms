import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`case_studies_platforms\`;`)
  await db.run(sql`DROP TABLE \`case_studies_external_links\`;`)
  await db.run(sql`DROP TABLE \`case_studies_embeds\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dansugcmodels_lead_magnets_idx\` ON \`payload_locked_documents_rels\` (\`dansugcmodels_lead_magnets_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`about\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`challenge\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`how_they_used_dans_u_g_c\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`results_achieved\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`summary\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`problem\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`solution\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`testimonial_quote\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`testimonial_person_name\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`testimonial_role\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`testimonial_company\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`budget_range\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`summary\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`problem\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`solution\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`testimonial_quote\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`testimonial_person_name\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`testimonial_role\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`testimonial_company\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`budget_range\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`about\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`challenge\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`how_they_used_dans_u_g_c\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`results_achieved\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`plugin_ai_instructions_id\` integer REFERENCES plugin_ai_instructions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_plugin_ai_instructions_id_idx\` ON \`payload_locked_documents_rels\` (\`plugin_ai_instructions_id\`);`)
}
