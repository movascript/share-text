CREATE TABLE "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"encrypted_content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"burn_on_read" boolean DEFAULT false NOT NULL,
	"views" integer DEFAULT 0 NOT NULL
);
