"use client"

import { Badge, BadgeDelta } from "@tremor/react"
import { HeartIcon, HeartPulseIcon } from "lucide-react"

export const TrendBadge = ({
  trend,
  isIcon,
  previous,
  latest,
}: {
  trend?: number
  isIcon?: boolean
  previous?: string
  latest?: string
}) => {
  return (
    <>
      {!isIcon ? (
        <BadgeDelta
          deltaType={
            trend! > 0 && trend! < 19
              ? "moderateIncrease"
              : trend! < 0 && trend! > -19
              ? "moderateDecrease"
              : trend! >= 20
              ? "increase"
              : trend! <= -20
              ? "decrease"
              : "unchanged"
          }
          isIncreasePositive={false}
          size="xs"
        >
          {trend! > 0 ? `+${trend}` : `${trend}`}
        </BadgeDelta>
      ) : (
        <Badge
          icon={latest === "Yes" ? HeartPulseIcon : HeartIcon}
          color={latest === "Yes" ? "red" : "green"}
        >
          {latest === "Yes" ? "Arrhythmia " : "Normal"}
        </Badge>
      )}
    </>
  )
}
