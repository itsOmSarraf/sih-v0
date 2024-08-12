CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"eventDate" date,
	"eventTime" time,
	"venue" text,
	"ticketLink" text,
	"image" text,
	"singer" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."singer" (
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
CREATE TABLE IF NOT EXISTS "my_schema"."songReq" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer,
	"phone" integer,
	"name" text,
	"dedicatedTo" text,
	"payment" text,
	"rating" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."event" ADD CONSTRAINT "event_singer_singer_id_fk" FOREIGN KEY ("singer") REFERENCES "my_schema"."singer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."songReq" ADD CONSTRAINT "songReq_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "my_schema"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
