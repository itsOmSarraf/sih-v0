CREATE TABLE IF NOT EXISTS "my_schema"."songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"songName" text NOT NULL,
	"artistName" text NOT NULL
);
