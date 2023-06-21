import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
    password: process.env.PGPASSWORD as string,
    host: process.env.PGHOST as string,
    user: process.env.PGUSER as string,
    database: process.env.PGDATABASE as string,
  },
} satisfies Config
