import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(
  "postgres://laanayam333:H0cnMSNJilk7@ep-black-smoke-959103.eu-central-1.aws.neon.tech/neondb" //! TODO: FIX PROBLEM WITH ENV VARIABLE
)
// // const sql = neon(process.env.DATABASE_URL as string)
neonConfig.fetchConnectionCache = true

export const db = drizzle(sql)

// // export async function getMeasures(limit: number, offset: number) {
// //   const { userId } = await auth()

// //   try {
// //     const lookupLimit = limit ? limit : 10
// //     const lookupOffset = offset ? offset : 0
// //     const allMeasures: Measure[] = await db
// //       .select()
// //       .from(MeasuresTable)
// //       .where(eq(MeasuresTable.userId, userId as string))
// //       .limit(lookupLimit)
// //       .offset(lookupOffset)
// //       .orderBy(desc(MeasuresTable.measureTime))
// //     return allMeasures
// //   } catch (error) {
// //     return error
// //   }
// // }

// // export async function getMeasureById(measureId: number) {
// //   try {
// //     const measure: Measure[] = await db
// //       .select()
// //       .from(MeasuresTable)
// //       .where(eq(MeasuresTable.id, measureId))
// //     return measure[0]
// //   } catch (error) {
// //     return error
// //   }
// // }

// // export async function addMeasure(measure: Measure) {
// //   try {
// //     const newMeasure = await db
// //       .insert(MeasuresTable)
// //       .values(measure)
// //       .returning()
// //     return newMeasure
// //   } catch (error) {
// //     return { error }
// //   }
// // }

// // export async function updateMeasure(editedMeasure: UpdatedMeasure) {
// //   try {
// //     const measure = db
// //       .update(MeasuresTable)
// //       .set(editedMeasure)
// //       .where(eq(MeasuresTable.id, editedMeasure.id))
// //     return measure
// //   } catch (error) {
// //     return { error }
// //   }
// // }

// // export async function getUserMeasuresCount() {
// //   const { userId } = await auth()

// //   try {
// //     const userMeasuresCount: UserMeasureCount[] = await db
// //       .select({ count: sql<number>`count(*)` })
// //       .from(MeasuresTable)
// //       .where(eq(MeasuresTable.userId, userId as string))

// //     return userMeasuresCount[0].count
// //   } catch (error) {
// //     return error
// //   }
// // }
