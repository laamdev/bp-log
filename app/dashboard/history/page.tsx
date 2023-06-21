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

// // import { Measure } from "@/lib/db/schema"
// // import { getMeasures } from "@/lib/measures"
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table"

// // export default async function HistoryPage() {
// //   const allMeasures = (await getMeasures()) as Measure[]

// //   const measures = allMeasures.map((measure) => ({
// //     id: measure.id,
// //     measureTime: format(new Date(measure.measureTime!), "Pp"),
// //     sys: measure.sys,
// //     dia: measure.dia,
// //     pulse: measure.pul,
// //     af: measure.af,
// //   }))

// //   return (
// //     <div className="flex flex-col gap-y-8">
// //       <div className="flex items-center justify-between space-y-2">
// //         <h2 className="text-3xl font-bold tracking-tight">
// //           Historical Readings
// //         </h2>
// //       </div>

// //       <Table>
// //         <TableCaption>A list of your recent readings.</TableCaption>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead className="w-[200px]">Date</TableHead>
// //             <TableHead>Systolic</TableHead>
// //             <TableHead>Diastolic</TableHead>
// //             <TableHead>Pulse</TableHead>
// //             <TableHead>Irregular?</TableHead>
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {measures.map((measure, idx) => (
// //             <TableRow key={idx}>
// //               <TableCell className="font-medium">
// //                 {measure.measureTime}
// //               </TableCell>
// //               <TableCell>{measure.sys}</TableCell>
// //               <TableCell>{measure.dia}</TableCell>
// //               <TableCell>{measure.pulse}</TableCell>
// //               <TableCell>{measure.af === true ? "Yes" : "No"}</TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   )
// // }
