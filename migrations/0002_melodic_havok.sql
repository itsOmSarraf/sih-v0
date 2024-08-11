ALTER TABLE "songReq" DROP CONSTRAINT "songReq_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "singer" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "songReq" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "songReq" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "songReq" ADD COLUMN "eventId" integer;--> statement-breakpoint
ALTER TABLE "songReq" ADD COLUMN "rating" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songReq" ADD CONSTRAINT "songReq_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "songReq" DROP COLUMN IF EXISTS "ratting";