"use client"

import { format } from "date-fns"
import { ClockIcon } from "lucide-react"

import { MeasureCard } from "@/components/dashboard/overview/measure-card"
import { AddMeasureDialog } from "@/components/forms/add-measure-dialog"
import { SectionHeading } from "@/components/shared/section-heading"

export const LatestMeasure = ({ allUserMeasures, addMeasureMutation }: any) => {
  const measuresCount = allUserMeasures.length
  const latestMeasure = allUserMeasures[measuresCount - 1]
  const previousMeasure =
    measuresCount >= 2 ? allUserMeasures[measuresCount - 2] : null

  const sysDiff = latestMeasure?.sys - previousMeasure?.sys!

  const diaDiff = latestMeasure?.dia - previousMeasure?.dia!

  const latestPp = latestMeasure?.sys - latestMeasure?.dia
  const previousPp = previousMeasure?.sys! - previousMeasure?.dia!
  const ppDiff = latestPp - previousPp

  const pulDiff = latestMeasure?.pul! - previousMeasure?.pul!

  const latestAf = latestMeasure?.af === true ? "Yes" : "No"

  return (
    <section className="bg-card rounded-xl p-4">
      <div className="flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0">
        <div>
          <SectionHeading>Latest Measure</SectionHeading>
          {allUserMeasures && measuresCount && latestMeasure?.measureTime ? (
            <div className="mt-1 flex items-center gap-x-2 text-sm">
              <ClockIcon className="h-4 w-4" />

              <span>
                {format(
                  new Date(`${latestMeasure?.measureTime}`),
                  "MMM dd 'at' h:mma"
                )}
              </span>
            </div>
          ) : null}
        </div>

        <AddMeasureDialog addMeasureMutation={addMeasureMutation} />
      </div>
      {allUserMeasures.length ? (
        <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
          <MeasureCard
            value={latestMeasure?.sys}
            label="Systolic"
            unit="mmHg"
            trend={sysDiff}
            measuresCount={measuresCount}
          />
          <MeasureCard
            value={latestMeasure?.dia}
            label="Diastolic"
            unit="mmHg"
            trend={diaDiff}
            measuresCount={measuresCount}
          />
          <MeasureCard
            value={latestMeasure?.pp}
            label="Pulse Preassure"
            unit="mmHg"
            trend={ppDiff}
            measuresCount={measuresCount}
          />
          <MeasureCard
            value={latestMeasure?.pul}
            label="Pulse"
            unit="bpm"
            trend={pulDiff}
            measuresCount={measuresCount}
          />
          <MeasureCard
            value={latestAf}
            label="Irregular beat?"
            isIrregular={true}
            measuresCount={measuresCount}
          />
          <MeasureCard
            value={`${latestMeasure.cuffLocation} / ${latestMeasure.bodyPosition}`}
            label="Cuff location & Body position"
            measuresCount={measuresCount}
            isBadge={false}
          />
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-prose text-center">
          {allUserMeasures.length === 0 &&
            `You have no measures logged. Please add your first blood preassure reading.`}
          {allUserMeasures.length === 1 &&
            `You need to have at least two measures logged to access the evolution visualizations. Please add another measure.`}
        </div>
      )}
    </section>
  )
}
