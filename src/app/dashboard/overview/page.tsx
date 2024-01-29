import { Metadata } from "next"

import { LatestMeasureSection } from "@/components/dashboard/overview/latest-measure/latest-measure-section"
import { RecentMeasuresSection } from "@/components/dashboard/overview/recent-measures/recent-measures-section"

export const metadata: Metadata = {
  title: "Overview",
}

export default async function OverviewRoute() {
  return (
    <div className="mt-16 grid gap-16">
      <LatestMeasureSection />

      <RecentMeasuresSection />
    </div>
  )
}
