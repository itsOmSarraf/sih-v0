CREATE TABLE IF NOT EXISTS "event" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"eventDate" date,
	"eventTime" time,
	"venue" text,
	"ticketLink" text,
	"image" text,
	"singer" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "singer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"gender" "char",
	"age" integer,
	"email" text,
	"address" varchar,
	"contactNo" varchar(10),
	"pfp" text,
	"upi_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "songReq" (
	"id" text,
	"phone" integer,
	"name" text,
	"dedicatedTo" text,
	"payment" text,
	"ratting" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_singer_singer_id_fk" FOREIGN KEY ("singer") REFERENCES "public"."singer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songReq" ADD CONSTRAINT "songReq_id_event_id_fk" FOREIGN KEY ("id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
