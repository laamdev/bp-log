import { Metadata } from "next"
import { auth } from "@clerk/nextjs"
import { ActivitySquareIcon } from "lucide-react"

import { fetchAllMeasures, fetchMeasuresCount } from "@/lib/data"
import { columns } from "@/components/dashboard/history/measures/columns"
import { DataTable } from "@/components/dashboard/history/measures/data-table"
import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"

export const metadata: Metadata = {
  title: "History",
}

export default async function HistoryRoute() {
  const { userId } = auth()

  if (!userId) return <div>Not Authorized</div>

  const allMeasuresData = fetchAllMeasures(userId)
  const measuresCountData = fetchMeasuresCount(userId)

  const [allMeasures, measuresCount] = await Promise.all([
    allMeasuresData,
    measuresCountData,
  ])

  return (
    <div className="bg-card rounded-xl p-5">
      <div className="mb-5">
        <SectionHeading>Your Measures</SectionHeading>
        {allMeasures && measuresCount ? (
          <Tagline icon={<ActivitySquareIcon className="h-4 w-4" />}>
            {`${measuresCount} ${`${
              measuresCount > 1 ? "measures" : "measure"
            }`}
            `}
          </Tagline>
        ) : null}
      </div>
      {/* @ts-expect-error */}
      <DataTable columns={columns} data={allMeasures} />
    </div>
  )
}
