ALTER TABLE "posts" RENAME COLUMN "encrypted_content" TO "content";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "expires_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "encrypted" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "burn_on_read";