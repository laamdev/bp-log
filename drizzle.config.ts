import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is missing")
// }

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/",
  password: process.env.PGPASSWORD,
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  // // driver: "pg",
  // // dbCredentials: {
  // //   password: process.env.PGPASSWORD,
  // //   connectionString: process.env.DATABASE_URL,
  // //   host: process.env.PGHOST,
  // //   user: process.env.PGUSER,
  // //   database: process.env.PGDATABASE,
  // // },
} satisfies Config
