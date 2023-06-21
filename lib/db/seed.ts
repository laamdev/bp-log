import { sql } from "@vercel/postgres"

import { db } from "@/lib/db"
import { Measure, measures, NewMeasure } from "@/lib/db/schema"

const newMeasures: NewMeasure[] = [
  {
    clerkId: "xasdasdasd",
    sys: 120,
    dia: 80,
    pul: 75,
    irregular: false,
  },
]

export async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS measures (
        id SERIAL PRIMARY KEY,
        sys INTEGER NOT NULL,
        dia INTEGER NOT NULL,
        pul INTEGER NOT NULL,
        irregular BOOLEAN NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `)
  console.log(`Created "measures" table`)

  const insertedMeasures: Measure[] = await db
    .insert(measures)
    .values(newMeasures)
    .returning()
  console.log(`Seeded ${insertedMeasures.length} measures`)

  return {
    createTable,
    insertedMeasures,
  }
}
