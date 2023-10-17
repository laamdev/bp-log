import { Metadata } from "next"
import { auth } from "@clerk/nextjs"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { MedicationsTable } from "@/lib/db/schema"
import { MedicationPage } from "@/components/pages/medication-page"

export const metadata: Metadata = {
  title: "Medication",
}

const getUserMedications = async () => {
  const { userId } = auth()

  const res = await db
    .select()
    .from(MedicationsTable)
    .where(eq(MedicationsTable.userId, userId as string))
    .orderBy(asc(MedicationsTable))

  if (!res) {
    throw new Error("Failed to fetch data")
  }

  return res
}

export default async function MedicationRoute() {
  const { userId } = await auth()

  if (!userId) return <div>Not Authorized</div>

  const data = await getUserMedications()

  return <MedicationPage allUserMedications={data} />
}
