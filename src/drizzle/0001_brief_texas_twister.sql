CREATE TABLE IF NOT EXISTS "medications" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"dose" integer NOT NULL,
	"time" text NOT NULL
);
