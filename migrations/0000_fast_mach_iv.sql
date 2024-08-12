CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"eventDate" date NOT NULL,
	"eventTime" time NOT NULL,
	"venue" text NOT NULL,
	"ticketLink" text,
	"image" text,
	"singer_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."singer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gender" char(1),
	"age" integer,
	"email" text,
	"address" varchar(255),
	"contactNo" varchar(15),
	"pfp" text,
	"upi_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "singer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."song_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"phone" varchar(15) NOT NULL,
	"name" text NOT NULL,
	"dedicated_to" text,
	"payment" text,
	"rating" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."event" ADD CONSTRAINT "event_singer_id_singer_id_fk" FOREIGN KEY ("singer_id") REFERENCES "my_schema"."singer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."song_request" ADD CONSTRAINT "song_request_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "my_schema"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
