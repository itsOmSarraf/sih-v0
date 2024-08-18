ALTER TABLE "my_schema"."singer" DROP CONSTRAINT "singer_username_unique";--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" DROP CONSTRAINT "song_request_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "my_schema"."event" ADD CONSTRAINT "event_singer_username_event_number_pk" PRIMARY KEY("singer_username","event_number");--> statement-breakpoint
ALTER TABLE "my_schema"."event" ADD COLUMN "event_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "my_schema"."singer" ADD COLUMN "event_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" ADD COLUMN "singer_username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" ADD COLUMN "event_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "my_schema"."event" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "my_schema"."singer" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" DROP COLUMN IF EXISTS "event_id";--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" DROP COLUMN IF EXISTS "eventNumber";