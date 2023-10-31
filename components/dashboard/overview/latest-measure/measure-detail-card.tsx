import {
  HeartIcon,
  HeartPulseIcon,
  MoveDownIcon,
  MoveDownRightIcon,
  MoveRightIcon,
  MoveUpIcon,
  MoveUpRightIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardTitle } from "@/components/ui/card"

export const MeasureDetailCard = ({
  value,
  label,
  unit,
  trend,
  isIrregular,
  isBadge = true,
  measuresCount,
}: {
  value: number | string
  label: string
  unit?: string
  trend?: number
  isIrregular?: boolean
  isBadge?: boolean
  measuresCount: number
  // // latest?: string
  // // measureLength: number
  // // isBadge?: boolean
}) => {
  return (
    <Card className="bg-background relative flex flex-col gap-y-4 p-4">
      <CardTitle>{label}</CardTitle>

      <div className="absolute right-4 top-4">
        {isIrregular ? (
          <Badge
            className={cn(
              {
                "bg-red-500": value === "Yes",
                "bg-green-500": value === "No",
              },
              "h-8 w-16 place-content-center"
            )}
          >
            {value === "Yes" ? (
              <HeartPulseIcon className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </Badge>
        ) : (
          <>
            {measuresCount > 1 && (
              <Badge
                className={cn(
                  {
                    "bg-blue-500": trend! < -10,
                    "bg-green-500": trend! < 0 && trend! >= -10,
                    "bg-yellow-500": trend! === 0,
                    "bg-orange-500": trend! > 0 && trend! <= 10,
                    "bg-red-500": trend! > 10,
                  },
                  "h-8 w-16 place-content-center",
                  !isBadge && "invisible"
                )}
              >
                <span>
                  {trend! < -10 ? (
                    <MoveDownIcon className="mr-1 h-4 w-4" />
                  ) : trend! < 0 && trend! >= -10 ? (
                    <MoveDownRightIcon className="mr-1 h-4 w-4" />
                  ) : trend! === 0 ? (
                    <MoveRightIcon className="mr-1 h-4 w-4" />
                  ) : trend! > 0 && trend! <= 10 ? (
                    <MoveUpRightIcon className="mr-1 h-4 w-4" />
                  ) : trend! > 10 ? (
                    <MoveUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    ""
                  )}
                </span>
                <span className="text-base">
                  {trend! > 0 ? `+${trend}` : trend}
                </span>
              </Badge>
            )}
          </>
        )}
      </div>

      <div className="flex items-baseline gap-x-1 text-2xl">
        <p className="capitalize">{value}</p>
        <p className="font-mono text-xs opacity-75">{unit}</p>
      </div>
    </Card>
  )
}
