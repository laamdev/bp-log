"use server"

import { auth } from "@clerk/nextjs"
import { asc, desc, eq, sql } from "drizzle-orm"

import { UserMeasureCount } from "@/types/drizzle"
import { db } from "@/lib/db"
import { Measure, measures, NewMeasure } from "@/lib/db/schema"

export async function getMeasures() {
  const { userId } = await auth()
  try {
    const allMeasures: Measure[] = await db
      .select()
      .from(measures)
      .where(eq(measures.userId, userId as string))
      .orderBy(desc(measures.measureTime))
    return allMeasures
  } catch (error) {
    return error
  }
}

export async function getMeasuresAsc() {
  const { userId } = await auth()
  try {
    const allMeasures: Measure[] = await db
      .select()
      .from(measures)
      .where(eq(measures.userId, userId as string))
      .orderBy(asc(measures.measureTime))
    return allMeasures
  } catch (error) {
    return error
  }
}

export async function addMeasure(newMeasure: NewMeasure) {
  try {
    const measure = db.insert(measures).values(newMeasure)
    return measure
  } catch (error) {
    return { error }
  }
}

export async function getUserMeasuresCount() {
  const { userId } = await auth()

  try {
    const userMeasuresCount: UserMeasureCount[] = await db
      .select({ count: sql<number>`count(*)` })
      .from(measures)
      .where(eq(measures.userId, userId as string))

    return userMeasuresCount[0].count
  } catch (error) {
    return error
  }
}
