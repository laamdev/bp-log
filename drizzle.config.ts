import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  breakpoints: true,
} satisfies Config
