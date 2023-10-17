import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { MeasuresTable, type Measure, type NewMeasure } from "@/lib/db/schema"

//! Queries

const allUsersMeasuresQuery = (userId: string) =>
  db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))
    // // .limit(lookupLimit)
    // // .offset(lookupOffset)
    .orderBy(asc(MeasuresTable.measureTime))

const addMeasureQuery = (newMeasureData: any) =>
  db.insert(MeasuresTable).values(newMeasureData)

//! Route Handlers

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // // const lookupLimit = limit ? limit : 10
    // // const lookupOffset = offset ? offset : 0
    // // const lookupLimit = 10
    // // const lookupOffset = 0
    const allUserMeasures: Measure[] = await allUsersMeasuresQuery(userId)

    return NextResponse.json(allUserMeasures)
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." })
  }
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newMeasureData = await request.json()

    const newMeasure = await addMeasureQuery(newMeasureData)

    return NextResponse.json(newMeasure)
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." })
  }
}
