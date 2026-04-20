import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`case_studies_creatives\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`views\` text,
  	\`saves\` text,
  	\`thumbstop_rate\` text,
  	\`platform\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_creatives_order_idx\` ON \`case_studies_creatives\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_creatives_parent_id_idx\` ON \`case_studies_creatives\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_creatives_video_idx\` ON \`case_studies_creatives\` (\`video_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`case_studies_creatives\`;`)
}
