import { format } from "path"
import { InfoIcon } from "lucide-react"

import { Measure } from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrackerCard } from "@/components/dashboard/overview/tracker-card"
import { SectionHeading } from "@/components/shared/section-heading"

const legend = [
  {
    color: "bg-zinc-500",
    label: "First Measure",
  },
  {
    color: "bg-blue-500",
    label: "High Decrease",
  },
  {
    color: "bg-green-500",
    label: "Decrease",
  },
  {
    color: "bg-yellow-500",
    label: "No Change",
  },
  {
    color: "bg-orange-500",
    label: "Increase",
  },
  {
    color: "bg-red-500",
    label: "High Increase",
  },
]

export const RecentMeasures = ({ allUserMeasures }: any) => {
  const sysArray = allUserMeasures.map((measure: Measure) => measure.sys)
  const diaArray = allUserMeasures.map((measure: Measure) => measure.dia)
  const dateArray = allUserMeasures.map(
    (measure: Measure) => measure.measureTime
  )

  return (
    <section className="bg-card relative rounded-xl p-4">
      <div className="absolute right-2 top-2 z-50 flex items-center justify-center">
        <Popover>
          <PopoverTrigger>
            <span className="sr-only">Toggle theme</span>
            <InfoIcon className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-3 gap-y-4">
            {legend.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <div className={cn(item.color, "h-4 w-4 rounded-full")} />
                <div>{item.label}</div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <SectionHeading>Measures Evolution</SectionHeading>

        {allUserMeasures.length >= 2 && (
          <div className="mt-1 flex items-center gap-x-2">
            Last {allUserMeasures.slice(-10).length} measures
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-2">
        {allUserMeasures.length >= 2 ? (
          <>
            <TrackerCard
              measures={sysArray.slice(-10)}
              dates={dateArray.slice(-10)}
              label="Systolic"
            />
            <TrackerCard
              measures={diaArray.slice(-10)}
              dates={dateArray.slice(-10)}
              label="Diastolic"
            />
          </>
        ) : (
          <div className="mx-auto max-w-prose text-center">
            {`You need to have at least two measures in your diary to visualize the evolution visualizations. Please add another measure.`}
          </div>
        )}
      </div>
    </section>
  )
}
