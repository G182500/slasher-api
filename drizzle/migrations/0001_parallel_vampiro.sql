CREATE TABLE "character" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "character_movie" (
	"character_id" uuid NOT NULL,
	"movie_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "character_movie" ADD CONSTRAINT "character_movie_character_id_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."character"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_movie" ADD CONSTRAINT "character_movie_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE cascade ON UPDATE no action;