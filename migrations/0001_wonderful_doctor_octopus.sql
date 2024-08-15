ALTER TABLE "my_schema"."singer" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "my_schema"."singer" ADD CONSTRAINT "singer_username_unique" UNIQUE("username");