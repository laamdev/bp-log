import { unstable_noStore as noStore } from "next/cache"
import { asc, desc, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { MeasuresTable, MedicationsTable } from "@/lib/db/schema"

// Measures

export const fetchAllMeasures = async (userId: string) => {
  noStore()
  const allMeasures = await db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))
    .orderBy(desc(MeasuresTable.measureTime))

  return allMeasures
}

export const fetchMeasureById = async (measureId: string) => {
  noStore()
  const measure = await db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.id, +measureId))

  return measure[0]
}

export const fetchLatestMeasure = async (userId: string) => {
  noStore()
  const twoLatestMeasures = await db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))
    .orderBy(desc(MeasuresTable.measureTime))
    .limit(2)

  return {
    lastMeasure: twoLatestMeasures[0],
    secondToLastMeasure: twoLatestMeasures[1],
  }
}

export const fetchMeasuresCount = async (userId: string) => {
  noStore()
  const measuresCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))

  return measuresCount[0].count
}

export const fetchRecentMeasures = async (userId: string) => {
  noStore()
  const recentMeasures = await db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))
    .orderBy(desc(MeasuresTable.measureTime))
    .limit(10)

  return recentMeasures
}

// Medications

export const fetchAllMedications = async (userId: string) => {
  noStore()
  const allMedications = await db
    .select()
    .from(MedicationsTable)
    .where(eq(MedicationsTable.userId, userId as string))
    .orderBy(desc(MedicationsTable.id))

  return allMedications
}

export const fetchMedicationsCount = async (userId: string) => {
  noStore()
  const medicationsCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(MedicationsTable)
    .where(eq(MedicationsTable.userId, userId as string))

  return medicationsCount[0].count
}
