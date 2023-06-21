import React from "react"
import { Card, Grid, Metric, Text } from "@tremor/react"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"

import { getMeasuresAsc } from "@/lib/actions/measures"
import { Measure, measures } from "@/lib/db/schema"
import { MeasureCard } from "@/components/dashboard/overview/measure-card"
import { TrackerWidget } from "@/components/dashboard/overview/tracker-widget"
import { AddMeasureDialog } from "@/components/forms/add-measure-dialog"

export default async function OverviewPage() {
  const allMeasures = (await getMeasuresAsc()) as Measure[]
  if (!allMeasures || allMeasures.length === 0)
    return (
      <div>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Measures
            </h2>
          </div>
          <AddMeasureDialog />
        </div>
        <div className="mt-4 max-w-prose">
          {`
          There are no measures in your diary. Please add at least one measure to
          visualize your results.
        `}
        </div>
      </div>
    )

  const latestMeasure = await allMeasures[allMeasures.length - 1]

  const previousMeasure =
    (await allMeasures.length) >= 2 ? allMeasures[allMeasures.length - 2] : null

  const sysDiff = (await latestMeasure?.sys) - previousMeasure?.sys!
  const diaDiff = (await latestMeasure?.dia) - previousMeasure?.dia!

  const latestPp = (await latestMeasure?.sys) - latestMeasure?.dia
  const previousPp = (await previousMeasure?.sys!) - previousMeasure?.dia!
  const ppDiff = (await latestPp) - previousPp

  const pulDiff = (await latestMeasure?.pul!) - previousMeasure?.pul!

  const latestAf = latestMeasure?.af === true ? "Yes" : "No"
  const previousAf = previousMeasure?.af === true ? "Yes" : "No"

  return (
    <div>
      <div className="flex flex-col justify-between gap-y-4 md:flex-row md:gap-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Latest Measure</h2>
          <div className="mt-1 flex items-center gap-x-2">
            <ClockIcon className="h-4 w-4" />
            {format(new Date(latestMeasure?.measureTime!), "MMM dd 'at' h:mma")}
          </div>
        </div>
        <AddMeasureDialog />
      </div>
      <Grid numItemsSm={2} numItemsLg={5} className="mt-8 gap-6">
        <MeasureCard
          value={latestMeasure?.sys}
          label="Systolic"
          unit="mmHg"
          trend={sysDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.dia}
          label="Diastolic"
          unit="mmHg"
          trend={diaDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.pp}
          label="Pulse Preassure"
          unit="mmHg"
          trend={ppDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestMeasure?.pul}
          label="Pulse"
          unit="bpm"
          trend={pulDiff}
          measureLength={allMeasures.length}
        />
        <MeasureCard
          value={latestAf}
          label="Irregular beat?"
          isIcon={true}
          latest={latestAf}
          previous={previousAf}
          measureLength={allMeasures.length}
        />
      </Grid>

      <div className="mt-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Measures Evolution
          </h2>
          <div className="mt-1 flex items-center gap-x-2">
            Last {allMeasures.length} measures
          </div>
        </div>
        {allMeasures.length >= 2 ? (
          <div className="mt-4">
            <TrackerWidget measures={allMeasures.slice(-25)} />
          </div>
        ) : (
          <div className="mt-4 max-w-prose">
            {`You need to have at least two measures in your diary to visualize the evolution visualizations. Please add another measure.`}
          </div>
        )}
      </div>
    </div>
  )
}

// // import {
// //   Activity,
// //   ArrowUpRight,
// //   CreditCard,
// //   DollarSignIcon,
// //   Download,
// //   HeartIcon,
// //   HeartPulseIcon,
// //   MoveDownRight,
// //   MoveRight,
// //   MoveUpRight,
// //   Users,
// // } from "lucide-react"

// // import { Measure } from "@/lib/db/schema"
// // import { getMeasures } from "@/lib/measures"
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card"
// // import { AddDialog } from "@/components/forms/add-dialog"

// // export default async function OverviewPage() {
// //   const allMeasures = (await getMeasures()) as Measure[]

// //   if (!allMeasures) return null

// //   const latestMeasure = await allMeasures[0]

// //   const previousMeasure =
// //     (await allMeasures.length) >= 2 ? allMeasures[1] : null

// //   const sysDiff = (await latestMeasure?.sys) - previousMeasure?.sys!
// //   const diaDiff = (await latestMeasure?.dia) - previousMeasure?.dia!

// //   const latestPp = (await latestMeasure?.sys) - latestMeasure?.dia
// //   const previousPp = (await previousMeasure?.sys!) - previousMeasure?.dia!
// //   const ppDiff = (await latestPp) - previousPp

// //   const pulDiff = (await latestMeasure?.pul!) - previousMeasure?.pul!
// //   return (
// //     <div className="flex flex-col gap-y-8">
// //       <div className="flex items-center justify-between space-y-2">
// //         <h2 className="text-3xl font-bold tracking-tight">Latest Reading</h2>
// //         <AddDialog />
// //       </div>

// //       <div className="flex flex-col gap-y-2.5">
// //         <h2>Blood Preassure</h2>
// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Systolic</CardTitle>
// //               {sysDiff > 0 && <MoveUpRight className="h-4 w-4 text-red-500" />}
// //               {sysDiff === 0 && (
// //                 <MoveRight className="h-4 w-4 text-muted-foreground" />
// //               )}
// //               {sysDiff < 0 && (
// //                 <MoveDownRight className="h-4 w-4 text-green-500" />
// //               )}
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">
// //                 {latestMeasure ? latestMeasure?.sys : "N/A"}
// //               </div>
// //               {latestMeasure && allMeasures.length >= 2 ? (
// //                 <p className="text-xs text-muted-foreground">
// //                   {sysDiff === 0 && `No difference `}
// //                   {sysDiff < 0 && `${sysDiff}`}
// //                   {sysDiff > 0 && `+${sysDiff}`}
// //                   {sysDiff === 0
// //                     ? `from previous reading`
// //                     : `mmHg from previous reading`}
// //                 </p>
// //               ) : (
// //                 <></>
// //               )}
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Diastolic</CardTitle>
// //               {diaDiff > 0 && <MoveUpRight className="h-4 w-4 text-red-500" />}
// //               {diaDiff === 0 && (
// //                 <MoveRight className="h-4 w-4 text-muted-foreground" />
// //               )}
// //               {diaDiff < 0 && (
// //                 <MoveDownRight className="h-4 w-4 text-green-500" />
// //               )}
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">
// //                 {latestMeasure ? latestMeasure?.dia : "N/A"}
// //               </div>
// //               {latestMeasure && allMeasures.length >= 2 ? (
// //                 <p className="text-xs text-muted-foreground">
// //                   {diaDiff === 0 && `No difference `}
// //                   {diaDiff < 0 && `${diaDiff}`}
// //                   {diaDiff > 0 && `+${diaDiff}`}
// //                   {diaDiff === 0
// //                     ? `from previous reading`
// //                     : `mmHg from previous reading`}
// //                 </p>
// //               ) : (
// //                 <></>
// //               )}
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">
// //                 Pulse Preassure
// //               </CardTitle>
// //               {ppDiff > 0 && <MoveUpRight className="h-4 w-4 text-red-500" />}
// //               {ppDiff === 0 && (
// //                 <MoveRight className="h-4 w-4 text-muted-foreground" />
// //               )}
// //               {ppDiff < 0 && (
// //                 <MoveDownRight className="h-4 w-4 text-green-500" />
// //               )}
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">
// //                 {latestPp ? latestPp : "N/A"}
// //               </div>
// //               {latestMeasure && allMeasures.length >= 2 ? (
// //                 <p className="text-xs text-muted-foreground">
// //                   {ppDiff === 0 && `No difference `}
// //                   {ppDiff < 0 && `${ppDiff}`}
// //                   {ppDiff > 0 && `+${ppDiff}`}
// //                   {ppDiff === 0
// //                     ? `from previous reading`
// //                     : `mmHg from previous reading`}
// //                 </p>
// //               ) : (
// //                 <></>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-y-2.5">
// //         <h2>Pulse</h2>
// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Heartrate</CardTitle>
// //               {sysDiff > 0 && <MoveUpRight className="h-4 w-4 text-red-500" />}
// //               {sysDiff === 0 && (
// //                 <MoveRight className="h-4 w-4 text-muted-foreground" />
// //               )}
// //               {sysDiff < 0 && (
// //                 <MoveDownRight className="h-4 w-4 text-green-500" />
// //               )}
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">
// //                 {latestMeasure ? latestMeasure?.pul : "N/A"}
// //               </div>

// //               {latestMeasure && allMeasures.length >= 2 ? (
// //                 <p className="text-xs text-muted-foreground">
// //                   {pulDiff === 0 && `No difference `}
// //                   {pulDiff < 0 && `${pulDiff}`}
// //                   {pulDiff > 0 && `+${pulDiff}`}
// //                   {pulDiff === 0
// //                     ? `from previous reading`
// //                     : `bpm from previous reading`}
// //                 </p>
// //               ) : (
// //                 <></>
// //               )}
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">
// //                 Irregular Beat?
// //               </CardTitle>
// //               {latestMeasure ? (
// //                 latestMeasure?.af === true ? (
// //                   <HeartPulseIcon className="h-4 w-4 text-red-500" />
// //                 ) : (
// //                   <HeartIcon className="h-4 w-4 text-green-500" />
// //                 )
// //               ) : (
// //                 <></>
// //               )}
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">
// //                 {latestMeasure
// //                   ? latestMeasure?.af === true
// //                     ? "Yes"
// //                     : "No"
// //                   : "N/A"}
// //               </div>

// //               {latestMeasure ? (
// //                 <p className="text-xs text-muted-foreground">
// //                   {latestMeasure?.af === previousMeasure?.af &&
// //                     `No difference from previous reading`}
// //                   {latestMeasure?.af === false &&
// //                     previousMeasure?.af === true &&
// //                     `Previous reading was irregular.`}
// //                   {latestMeasure?.af === true &&
// //                     previousMeasure?.af === false &&
// //                     `Previous reading was regular.`}
// //                 </p>
// //               ) : (
// //                 <></>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
