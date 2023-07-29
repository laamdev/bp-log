import { TrackerWidget } from "@/components/dashboard/overview/tracker-widget"

export const RecentMeasures = ({ allMeasures }: any) => {
  return (
    <section className="mt-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Measures Evolution
        </h2>
        <div className="mt-1 flex items-center gap-x-2">
          Last {allMeasures.length} measures
        </div>
      </div>
      <div className="mt-6">
        {allMeasures.length >= 2 ? (
          <div>
            <TrackerWidget measures={allMeasures.slice(-25)} />
          </div>
        ) : (
          <div className="max-w-prose">
            {`You need to have at least two measures in your diary to visualize the evolution visualizations. Please add another measure.`}
          </div>
        )}
      </div>
    </section>
  )
}
