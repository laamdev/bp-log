import { Card, Flex, Metric, Text } from "@tremor/react"

import { TrendBadge } from "@/components/dashboard/overview/trend-badge"

export const MeasureCard = ({
  value,
  label,
  unit,
  trend,
  isIcon,
  latest,
  previous,
  measureLength,
}: {
  value: number | string
  label: string
  unit?: string
  trend?: number
  isIcon?: boolean
  latest?: string
  previous?: string
  measureLength: number
}) => {
  return (
    <Card>
      <Flex justifyContent="between" alignItems="center">
        <Text>{label}</Text>
        {measureLength >= 2 && (
          <TrendBadge
            trend={trend}
            isIcon={isIcon}
            previous={previous}
            latest={latest}
          />
        )}
      </Flex>
      <Metric>
        {`${value} `}
        <span className="text-xs font-normal opacity-75">{unit}</span>
      </Metric>
    </Card>
  )
}
