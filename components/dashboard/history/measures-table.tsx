import { format } from "date-fns"

import { getMeasures } from "@/lib/actions/measures"
import {
  columns,
  Measure,
} from "@/components/dashboard/history/measures/columns"
import { DataTable } from "@/components/dashboard/history/measures/data-table"

async function getData(): Promise<Measure[]> {
  const allMeasures = (await getMeasures()) as Measure[]

  const measures = allMeasures.map((measure) => ({
    id: measure.id,
    measureTime: format(new Date(measure.measureTime!), "MMM dd 'at' h:mma"),
    sys: measure.sys,
    dia: measure.dia,
    pp: measure.pp,
    pul: measure.pul,
    af: measure.af === true ? "Yes" : "No",
  }))

  return measures
}

export const MeasuresTable = async () => {
  const data = await getData()
  return (
    <div className="mt-12">
      <div>
        <h2 className="text-3xl font-semibold">Measures History</h2>
        <p className="mt-1 flex items-center gap-x-2 text-zinc-700 dark:text-zinc-300">
          {`You have logged ${data.length} blood preassure measures.`}
        </p>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
