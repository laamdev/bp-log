import { auth } from "@clerk/nextjs"
import { format } from "date-fns"
import { ClockIcon } from "lucide-react"
import { Suspense } from "react"

import { MeasureDetails } from "@/components/dashboard/overview/latest-measure/measure-details"
import { AddMeasureDialog } from "@/components/forms-and-dialogs/add-measure-dialog"
import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"
import { fetchLatestMeasure, fetchMeasuresCount } from "@/lib/data"

export const LatestMeasureSection = async () => {
  const { userId } = await auth()

  if (!userId) {
    return
  }

  const latestFeaturesData = fetchLatestMeasure(userId)
  const measuresCountData = fetchMeasuresCount(userId)

  const [twoLastMeasures, measuresCount] = await Promise.all([
    latestFeaturesData,
    measuresCountData,
  ])

  return (
    <section>
      <div className="flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0">
        <div>
          <SectionHeading>Latest Measure</SectionHeading>
          {twoLastMeasures.lastMeasure ? (
            <Tagline icon={<ClockIcon className="size-4" />}>
              {format(
                new Date(`${twoLastMeasures.lastMeasure?.measureTime}`),
                "MMM dd 'at' h:mma"
              )}
            </Tagline>
          ) : null}
        </div>

        <AddMeasureDialog />
      </div>
      {twoLastMeasures.lastMeasure ? (
        <Suspense>
          <MeasureDetails
            lastMeasure={twoLastMeasures.lastMeasure}
            secondToLastMeasure={twoLastMeasures.secondToLastMeasure}
            measuresCount={measuresCount}
          />
        </Suspense>
      ) : (
        <div className="mx-auto mt-12 max-w-prose text-center">
          {measuresCount === 0 &&
            `You have no measures logged. Please add your first blood preassure reading.`}
          {measuresCount === 1 &&
            `You need to have at least two measures logged to access the evolution visualizations. Please add another measure.`}
        </div>
      )}
    </section>
  )
}
