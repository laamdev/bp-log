"use client"

import { format } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Measure } from "@/lib/db/schema"

// // const data = [
// //   {
// //     name: "Jan",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Feb",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Mar",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Apr",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "May",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Jun",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Jul",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Aug",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Sep",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Oct",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Nov",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// //   {
// //     name: "Dec",
// //     total: Math.floor(Math.random() * 5000) + 1000,
// //   },
// // ]

export const DataViz = ({ recentMeasures }: any) => {
  const data = recentMeasures.map((measure: Measure) => ({
    name: format(new Date(measure.measureTime!), "mm"),
    total: measure.pp,
  }))
  return (
    <div>
      <div className="mt-12 ">
        <h2 className="text-3xl font-bold tracking-tight">
          Measures Evolution
        </h2>
      </div>
      <div className="bg-card mt-6 rounded-2xl pr-2 pt-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
