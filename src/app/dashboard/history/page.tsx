import { auth } from "@clerk/nextjs"
import { ActivitySquareIcon } from "lucide-react"
import { Metadata } from "next"

import { columns } from "@/components/dashboard/history/measures/columns"
import { DataTable } from "@/components/dashboard/history/measures/data-table"
import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"
import { fetchAllMeasures, fetchMeasuresCount } from "@/lib/data"

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
    <div>
      <div>
        <SectionHeading>Your Measures</SectionHeading>
        {allMeasures && measuresCount ? (
          <Tagline icon={<ActivitySquareIcon className="size-4" />}>
            {`${measuresCount} ${`${
              measuresCount > 1 ? "measures" : "measure"
            }`}
            `}
          </Tagline>
        ) : null}
      </div>
      <div className="mt-5">
        {/* @ts-expect-error */}
        <DataTable columns={columns} data={allMeasures} />
      </div>
    </div>
  )
}
