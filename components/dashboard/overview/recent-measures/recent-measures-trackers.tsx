import { auth } from "@clerk/nextjs"

import { fetchRecentMeasures } from "@/lib/data"
import { Measure } from "@/lib/db/schema"
import { RecentMeasuresTrackerCard } from "@/components/dashboard/overview/recent-measures/recent-measures-tracker-card"

export const RecentMeasuresTrackers = async () => {
  const { userId } = await auth()

  if (!userId) {
    return
  }

  const recentMeasures = await fetchRecentMeasures(userId)
  const reversedMeasures = recentMeasures.reverse()

  const sysArray = reversedMeasures.map((measure: Measure) => measure.sys)
  const diaArray = reversedMeasures.map((measure: Measure) => measure.dia)
  const dateArray = reversedMeasures.map(
    (measure: Measure) => measure.measureTime
  )

  return (
    <div className="grid gap-2">
      <RecentMeasuresTrackerCard
        measures={sysArray.slice(-10)}
        dates={dateArray.slice(-10)}
        label="Systolic"
      />
      <RecentMeasuresTrackerCard
        measures={diaArray.slice(-10)}
        dates={dateArray.slice(-10)}
        label="Diastolic"
      />
    </div>
  )
}
