import { Metadata } from "next"
import { auth } from "@clerk/nextjs"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { MeasuresTable } from "@/lib/db/schema"
import { HistoryPage } from "@/components/pages/history-page"

export const metadata: Metadata = {
  title: "History",
}

const getUserMeasures = async () => {
  const { userId } = auth()

  const res = await db
    .select()
    .from(MeasuresTable)
    .where(eq(MeasuresTable.userId, userId as string))
    .orderBy(asc(MeasuresTable.measureTime))

  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res
}

export default async function HistoryRoute() {
  const { userId } = auth()

  if (!userId) return <div>Not Authorized</div>

  return (
    <div>
      <HistoryPage />
    </div>
  )
}
