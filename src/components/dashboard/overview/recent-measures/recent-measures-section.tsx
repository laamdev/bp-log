import { auth } from "@clerk/nextjs"
import { ActivitySquareIcon, InfoIcon } from "lucide-react"
import { Suspense } from "react"

import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { variantLegend } from "@/lib/constants"
import { fetchMeasuresCount } from "@/lib/data"
import { cn } from "@/lib/utils"

import { RecentMeasuresSectionSkeleton } from "./recent-measures-section-skeleton"
import { RecentMeasuresTrackers } from "./recent-measures-trackers"

export const RecentMeasuresSection = async () => {
  const { userId } = await auth()

  if (!userId) {
    return
  }
  const measuresCount = await fetchMeasuresCount(userId)

  return (
    <section className="relative">
      <div className="absolute right-2 top-2 z-50 flex items-center justify-center">
        <Popover>
          <PopoverTrigger>
            <span className="sr-only">Toggle theme</span>
            <InfoIcon className="size-4" />
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-3 gap-y-4">
            {variantLegend.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <div className={cn(item.color, "size-4 rounded-full")} />
                <div>{item.label}</div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <SectionHeading>Measures Evolution</SectionHeading>

        <Tagline icon={<ActivitySquareIcon className="size-4" />}>
          {measuresCount >= 2 && (
            <>Last {measuresCount >= 10 ? 10 : measuresCount} measures</>
          )}
        </Tagline>
      </div>

      <div className="mt-8">
        {measuresCount >= 2 ? (
          <Suspense fallback={<RecentMeasuresSectionSkeleton />}>
            <RecentMeasuresTrackers />
          </Suspense>
        ) : (
          <div className="mx-auto max-w-prose text-center">
            {`You need to have at least two measures in your diary to visualize the evolution visualizations. Please add another measure.`}
          </div>
        )}
      </div>
    </section>
  )
}
