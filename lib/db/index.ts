import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const client = postgres({ ssl: "require" })
export const db: PostgresJsDatabase = drizzle(client)
