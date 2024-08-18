CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."event" (
	"singer_username" text NOT NULL,
	"event_number" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"eventDate" date NOT NULL,
	"eventTime" time NOT NULL,
	"venue" text NOT NULL,
	"ticketLink" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_singer_username_event_number_pk" PRIMARY KEY("singer_username","event_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."singer" (
	"username" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gender" char(1),
	"age" integer,
	"email" text,
	"address" varchar(255),
	"contactNo" varchar(15),
	"pfp" text,
	"upi_id" text,
	"event_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "singer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."song_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"singer_username" text NOT NULL,
	"event_number" integer NOT NULL,
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
 ALTER TABLE "my_schema"."event" ADD CONSTRAINT "event_singer_username_singer_username_fk" FOREIGN KEY ("singer_username") REFERENCES "my_schema"."singer"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
