import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { MeasuresTable, type Measure, type NewMeasure } from "@/lib/db/schema"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const measure: Measure[] = await db
      .select()
      .from(MeasuresTable)
      .where(eq(MeasuresTable.id, +params.id))

    return NextResponse.json(measure[0])
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." })
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { editedMeasure, measureId } = await request.json()
    console.log(editedMeasure)
    await db
      .update(MeasuresTable)
      .set(editedMeasure)
      .where(eq(MeasuresTable.id, measureId))

    return NextResponse.json({ success: "Something went wrong." })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." })
  }
}
