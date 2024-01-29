import { auth } from "@clerk/nextjs"

import { RecentMeasuresTrackerCard } from "@/components/dashboard/overview/recent-measures/recent-measures-tracker-card"
import { fetchRecentMeasures } from "@/lib/data"
import { Measure } from "@/lib/db/schema"

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
    <div className="grid grid-cols-2 gap-4">
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
