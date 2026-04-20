import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`app_logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_app_logo_idx\` ON \`case_studies\` (\`app_logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_case_studies\` (
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
  await db.run(sql`INSERT INTO \`__new_case_studies\`("id", "title", "generate_slug", "slug", "status", "site", "published_date", "hero_media_id", "client_name", "industry", "summary", "problem", "solution", "testimonial_quote", "testimonial_person_name", "testimonial_role", "testimonial_company", "budget_range", "author_id", "meta_original_url", "updated_at", "created_at") SELECT "id", "title", "generate_slug", "slug", "status", "site", "published_date", "hero_media_id", "client_name", "industry", "summary", "problem", "solution", "testimonial_quote", "testimonial_person_name", "testimonial_role", "testimonial_company", "budget_range", "author_id", "meta_original_url", "updated_at", "created_at" FROM \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies\` RENAME TO \`case_studies\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_hero_media_idx\` ON \`case_studies\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_author_idx\` ON \`case_studies\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
}
