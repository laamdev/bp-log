"use client"

// // import { startTransition } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteMeasure } from "@/app/_actions"

export type Measure = {
  id: string
  measureTime: string
  sys: number
  dia: number
  pul: number
  pp: number
  af: boolean | string
  //   //   status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Measure>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "measureTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const measureTimeValue = row.getValue("measureTime") as string

      return (
        <div>{format(parseISO(measureTimeValue), "MMM dd 'at' h:mma")}</div>
      )
    },
  },
  {
    accessorKey: "sys",
    header: () => <div className="text-left">{`Sys`}</div>,
    cell: ({ row }) => {
      // // const amount = parseFloat(row.getValue("amount"))
      // // const formatted = new Intl.NumberFormat("en-US", {
      // //   style: "currency",
      // //   currency: "USD",
      // // }).format(amount)
      const sysValue = row.getValue("sys") as number

      // // return <div className="text-right font-medium">{sysValue} bpm</div>
      return (
        <div className="font-medium">
          <span
            className={cn(
              sysValue < 120
                ? "text-green-500"
                : sysValue >= 120 && sysValue <= 129
                ? "text-lime-500"
                : sysValue >= 130 && sysValue <= 139
                ? "text-yellow-500"
                : sysValue >= 140 && sysValue <= 159
                ? "text-amber-500"
                : sysValue >= 160 && sysValue <= 179
                ? "text-orange-500"
                : sysValue >= 180
                ? "text-red-500"
                : "text-zinc-500"
            )}
          >
            {sysValue}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "dia",
    header: () => <div className="text-left">{`Dia`}</div>,
    cell: ({ row }) => {
      const diaValue = row.getValue("dia") as number
      return (
        <div className="font-medium">
          <span
            className={cn(
              diaValue < 80
                ? "text-green-500"
                : diaValue >= 80 && diaValue <= 84
                ? "text-lime-500"
                : diaValue >= 85 && diaValue <= 89
                ? "text-yellow-500"
                : diaValue >= 90 && diaValue <= 99
                ? "text-amber-500"
                : diaValue >= 100 && diaValue <= 109
                ? "text-orange-500"
                : diaValue >= 110
                ? "text-red-500"
                : "text-zinc-500"
            )}
          >
            {diaValue}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "pp",
    header: () => <div className="text-left">{`PP`}</div>,
    cell: ({ row }) => {
      const ppValue = row.getValue("pp") as number
      return <div className="font-medium">{ppValue}</div>
    },
  },
  {
    accessorKey: "pul",
    header: () => <div className="text-left">{`Pulse`}</div>,
    cell: ({ row }) => {
      const pulValue = row.getValue("pul") as number
      return <div className="font-medium">{pulValue}</div>
    },
  },
  {
    accessorKey: "af",
    header: () => <div className="text-left">{`AF`}</div>,
    cell: ({ row }) => {
      const afValue = row.getValue("af") as string
      return (
        <div
          className={cn(
            "font-medium",
            afValue === "Yes" ? "text-red-500" : "text-green-500"
          )}
        >
          {afValue ? "Yes" : "No"}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const measure = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `Date: ${format(
                    new Date(`${measure.measureTime}`),
                    "MMM dd 'at' h:mma"
                  )}
                  | Systolic: ${measure.sys} | Diastolic: ${
                    measure.dia
                  } | Pulse Preassure: ${measure.pp} | Pulse: ${
                    measure.pul
                  } | Irregularity: ${measure.af}`
                )
              }
            >
              Copy measure
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/history/${measure.id}/edit`}>
                Edit measure
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
            // // onClick={() => {
            // //   startTransition(() => {
            // //     deleteMeasure(measure.id)
            // //   })
            // // }}
            >
              <Link href={`/dashboard/history/${measure.id}/delete`}>
                Delete measure
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
