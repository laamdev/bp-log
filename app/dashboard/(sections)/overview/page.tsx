import Link from "next/link"
import { auth } from "@clerk/nextjs"

import { getMeasuresAsc } from "@/lib/actions/measures"
import { Measure } from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeasuresTable } from "@/components/dashboard/history/measures-table"
import { LatestMeasure } from "@/components/dashboard/overview/latest-measure"
import { RecentMeasures } from "@/components/dashboard/overview/recent-measures"
import { AddMeasureDialog } from "@/components/forms/add-measure-dialog"

export default async function OverviewPage() {
  const { userId } = await auth()

  if (!userId) throw new Error("You must sign in to access this page.")

  const allMeasures = (await getMeasuresAsc()) as Measure[]

  if (!allMeasures || allMeasures.length === 0)
    return (
      <div>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Measures
            </h2>
          </div>
          <Link
            href={"/dashboard/add-measure"}
            className={cn(buttonVariants({ variant: "default" }))}
          />
          {/* <AddMeasureDialog /> */}
        </div>
        <div className="mt-4 max-w-prose">
          {`
          There are no measures in your diary. Please add at least one measure to
          visualize your results.
        `}
        </div>
      </div>
    )

  const latestMeasure = await allMeasures[allMeasures.length - 1]

  const previousMeasure =
    (await allMeasures.length) >= 2 ? allMeasures[allMeasures.length - 2] : null

  const sysDiff = (await latestMeasure?.sys) - previousMeasure?.sys!
  const diaDiff = (await latestMeasure?.dia) - previousMeasure?.dia!

  const latestPp = (await latestMeasure?.sys) - latestMeasure?.dia
  const previousPp = (await previousMeasure?.sys!) - previousMeasure?.dia!
  const ppDiff = (await latestPp) - previousPp

  const pulDiff = (await latestMeasure?.pul!) - previousMeasure?.pul!

  const latestAf = latestMeasure?.af === true ? "Yes" : "No"
  const previousAf = previousMeasure?.af === true ? "Yes" : "No"

  return (
    <div>
      <LatestMeasure
        latestMeasure={latestMeasure}
        allMeasures={allMeasures}
        sysDiff={sysDiff}
        diaDiff={diaDiff}
        ppDiff={ppDiff}
        pulDiff={pulDiff}
        latestAf={latestAf}
        previousAf={previousAf}
      />

      <RecentMeasures allMeasures={allMeasures} />
    </div>
  )
}
