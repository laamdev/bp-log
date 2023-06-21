-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "measures" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"sys" integer NOT NULL,
	"dia" integer NOT NULL,
	"pp" integer NOT NULL,
	"pul" integer NOT NULL,
	"af" boolean,
	"measureTime" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

*/