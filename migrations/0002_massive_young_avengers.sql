ALTER TABLE "my_schema"."event" RENAME COLUMN "singer_id" TO "singer_username";--> statement-breakpoint
ALTER TABLE "my_schema"."event" DROP CONSTRAINT "event_singer_id_singer_id_fk";
--> statement-breakpoint
ALTER TABLE "my_schema"."event" ALTER COLUMN "singer_username" SET DATA TYPE text;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'my_schema'
                AND table_name = 'singer'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "singer" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "my_schema"."singer" ADD PRIMARY KEY ("username");--> statement-breakpoint
ALTER TABLE "my_schema"."singer" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "my_schema"."song_request" ADD COLUMN "eventNumber" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."event" ADD CONSTRAINT "event_singer_username_singer_username_fk" FOREIGN KEY ("singer_username") REFERENCES "my_schema"."singer"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
