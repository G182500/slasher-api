CREATE TABLE "movie" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"director" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"budget" numeric(12, 2) NOT NULL,
	"profit" numeric(15, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
