ALTER TABLE "event" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "songReq" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "songReq" ALTER COLUMN "id" SET NOT NULL;