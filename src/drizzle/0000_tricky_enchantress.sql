CREATE TABLE IF NOT EXISTS "measures" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"sys" integer NOT NULL,
	"dia" integer NOT NULL,
	"pp" integer NOT NULL,
	"pul" integer NOT NULL,
	"af" boolean,
	"measureTime" timestamp with time zone DEFAULT now(),
	"cuffLocation" text NOT NULL,
	"bodyPosition" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);
