import Link from "next/link"
import { Grid } from "@tremor/react"
import { format } from "date-fns"
import { ClockIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MeasureCard } from "@/components/dashboard/overview/measure-card"
import { AddMeasureDialog } from "@/components/forms/add-measure-dialog"

export const LatestMeasure = ({
  allMeasures,
  latestMeasure,
  sysDiff,
  diaDiff,
  ppDiff,
  pulDiff,
  latestAf,
  previousAf,
}: any) => {
  return (
    <section>
      <div className="flex flex-col justify-between gap-y-4 md:flex-row md:gap-y-0">
        <div>
          <h2 className="text-3xl font-semibold">Latest Measure</h2>
          <div className="mt-1 flex items-center gap-x-2">
            <ClockIcon className="h-4 w-4" />
            {format(new Date(latestMeasure?.measureTime!), "MMM dd 'at' h:mma")}
          </div>
        </div>
        <Link
          href={"/dashboard/add-measure"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Measure
        </Link>
        {/* <AddMeasureDialog /> */}
      </div>

      <Grid numItemsSm={2} numItemsLg={3} className="mt-6 gap-6">
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
    </section>
  )
}
