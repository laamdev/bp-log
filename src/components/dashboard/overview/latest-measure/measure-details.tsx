import { MeasureDetailCard } from "@/components/dashboard/overview/latest-measure/measure-detail-card"

export const MeasureDetails = ({
  lastMeasure,
  secondToLastMeasure,
  measuresCount,
}: {
  lastMeasure: any
  secondToLastMeasure: any
  measuresCount: number
}) => {
  const sysDiff = lastMeasure?.sys - secondToLastMeasure?.sys!

  const diaDiff = lastMeasure?.dia - secondToLastMeasure?.dia!

  const latestPp = lastMeasure?.sys - lastMeasure?.dia

  const previousPp = secondToLastMeasure?.sys! - secondToLastMeasure?.dia!

  const ppDiff = latestPp - previousPp

  const pulDiff = lastMeasure?.pul! - secondToLastMeasure?.pul!

  const latestAf = lastMeasure?.af === true ? "Yes" : "No"

  return (
    <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
      <MeasureDetailCard
        value={lastMeasure?.sys}
        label="Systolic"
        unit="mmHg"
        trend={sysDiff}
        measuresCount={measuresCount}
      />
      <MeasureDetailCard
        value={lastMeasure?.dia}
        label="Diastolic"
        unit="mmHg"
        trend={diaDiff}
        measuresCount={measuresCount}
      />
      <MeasureDetailCard
        value={lastMeasure?.pp}
        label="Pulse Preassure"
        unit="mmHg"
        trend={ppDiff}
        measuresCount={measuresCount}
      />
      <MeasureDetailCard
        value={lastMeasure?.pul}
        label="Pulse"
        unit="bpm"
        trend={pulDiff}
        measuresCount={measuresCount}
      />
      <MeasureDetailCard
        value={latestAf}
        label="Irregular beat?"
        isIrregular={true}
        measuresCount={measuresCount}
      />
      <MeasureDetailCard
        value={`${lastMeasure.cuffLocation} / ${lastMeasure.bodyPosition}`}
        label="Cuff location & Body position"
        measuresCount={measuresCount}
        isBadge={false}
      />
    </div>
  )
}
