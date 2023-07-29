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

export default async function HistoryPage() {
  const data = await getData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
