import React from "react"
import { auth } from "@clerk/nextjs"
import { Grid } from "@tremor/react"
import { format } from "date-fns"
import { ClockIcon } from "lucide-react"

import { getMeasuresAsc } from "@/lib/actions/measures"
import { Measure } from "@/lib/db/schema"
import { MeasureCard } from "@/components/dashboard/overview/measure-card"
import { TrackerWidget } from "@/components/dashboard/overview/tracker-widget"
import { AddMeasureDialog } from "@/components/forms/add-measure-dialog"

export default async function OverviewPage() {
  const { userId } = auth()

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
          <AddMeasureDialog />
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
      <div className="flex flex-col justify-between gap-y-4 md:flex-row md:gap-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Latest Measure</h2>
          <div className="mt-1 flex items-center gap-x-2">
            <ClockIcon className="h-4 w-4" />
            {format(new Date(latestMeasure?.measureTime!), "MMM dd 'at' h:mma")}
          </div>
        </div>
        <AddMeasureDialog />
      </div>
      <Grid numItemsSm={2} numItemsLg={5} className="mt-8 gap-6">
        <MeasureCard
          value={latestMeasure?.sys}
          label="Systolic"
          unit="mmHg"
          trend={sysDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.dia}
          label="Diastolic"
          unit="mmHg"
          trend={diaDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.pp}
          label="Pulse Preassure"
          unit="mmHg"
          trend={ppDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.pul}
          label="Pulse"
          unit="bpm"
          trend={pulDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestAf}
          label="Irregular beat?"
          isIcon={true}
          latest={latestAf}
          previous={previousAf}
          measureLength={allMeasures.length}
        />
      </Grid>

      <div className="mt-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Measures Evolution
          </h2>
          <div className="mt-1 flex items-center gap-x-2">
            Last {allMeasures.length} measures
          </div>
        </div>
        {allMeasures.length >= 2 ? (
          <div className="mt-4">
            <TrackerWidget measures={allMeasures.slice(-25)} />
          </div>
        ) : (
          <div className="mt-4 max-w-prose">
            {`You need to have at least two measures in your diary to visualize the evolution visualizations. Please add another measure.`}
          </div>
        )}
      </div>
    </div>
  )
}
