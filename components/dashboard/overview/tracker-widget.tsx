"use client"

import {
  Card,
  Color,
  Flex,
  Grid,
  Icon,
  Text,
  Title,
  Tracker,
} from "@tremor/react"
import { format } from "date-fns"
import {
  HeartIcon,
  HeartPulseIcon,
  MoveDownIcon,
  MoveDownRightIcon,
  MoveRightIcon,
  MoveUpIcon,
  MoveUpRightIcon,
} from "lucide-react"

interface Tracker {
  color: Color
  tooltip: string
}

// [
//   { color: "emerald", tooltip: "Operational" },
//   { color: "rose", tooltip: "Downtime" },
//   { color: "emerald", tooltip: "Operational" },
// ]

export const TrackerWidget = ({ measures }: { measures: any }) => {
  const sys: Tracker[] = measures?.map((measure: any, index: number) => ({
    color:
      measures[index - 1]?.sys - measure.sys > 0 &&
      measures[index - 1]?.sys - measure.sys < 10
        ? "green"
        : measures[index - 1]?.sys - measure.sys >= 10
        ? "blue"
        : measures[index - 1]?.sys - measure.sys < 0 &&
          measures[index - 1]?.sys - measure.sys > -10
        ? "orange"
        : measures[index - 1]?.sys - measure.sys <= -10
        ? "red"
        : "yellow",
    tooltip: (
      <div>
        <div>
          <span>{measure.sys}</span>
          {index !== 0 && measure.sys - measures[index - 1]?.sys !== 0 && (
            <span className="ml-1 text-xs">
              {`${measure.sys - measures[index - 1]?.sys > 0 ? "+" : ""}${
                measure.sys - measures[index - 1]?.sys
              }`}
            </span>
          )}
        </div>
        <span>{format(new Date(measure.measureTime), "MMM d")}</span>
      </div>
    ),
  }))

  const dia: Tracker[] = measures?.map((measure: any, index: number) => ({
    color:
      measures[index - 1]?.dia - measure.dia > 0 &&
      measures[index - 1]?.dia - measure.dia < 10
        ? "green"
        : measures[index - 1]?.dia - measure.dia >= 10
        ? "blue"
        : measures[index - 1]?.dia - measure.dia < 0 &&
          measures[index - 1]?.dia - measure.dia > -10
        ? "orange"
        : measures[index - 1]?.dia - measure.dia <= -10
        ? "red"
        : "yellow",
    tooltip: (
      <div>
        <div>
          <span>{measure.dia}</span>
          {index !== 0 && measure.dia - measures[index - 1]?.dia !== 0 && (
            <span className="ml-1 text-xs">
              {`${measure.dia - measures[index - 1]?.dia > 0 ? "+" : ""}${
                measure.dia - measures[index - 1]?.dia
              }`}
            </span>
          )}
        </div>
        <span>
          {format(new Date(measure.measureTime), "MMM dd 'at' h:mma")}
        </span>
      </div>
    ),
  }))

  const pul: Tracker[] = measures?.map((measure: any, index: number) => ({
    color:
      measures[index - 1]?.pul - measure.pul > 0 &&
      measures[index - 1]?.pul - measure.pul < 10
        ? "green"
        : measures[index - 1]?.pul - measure.pul >= 10
        ? "blue"
        : measures[index - 1]?.pul - measure.pul < 0 &&
          measures[index - 1]?.pul - measure.pul > -10
        ? "orange"
        : measures[index - 1]?.pul - measure.pul <= -10
        ? "red"
        : "yellow",
    tooltip: (
      <div>
        <div>
          <span>{measure.pul}</span>
          {index !== 0 && measure.pul - measures[index - 1]?.pul !== 0 && (
            <span className="ml-1 text-xs">
              {`${measure.pul - measures[index - 1]?.pul > 0 ? "+" : ""}${
                measure.pul - measures[index - 1]?.pul
              }`}
            </span>
          )}
        </div>
        <span>{format(new Date(measure.measureTime), "MMM d")}</span>
      </div>
    ),
  }))

  const af: Tracker[] = measures?.map((measure: any, index: number) => ({
    color: measure?.af ? "red" : "green",
    tooltip: (
      <div>
        <div>
          <span>{measure.af ? "Yes" : "No"}</span>
        </div>
        <span>{format(new Date(measure.measureTime), "MMM d")}</span>
      </div>
    ),
  }))

  const categories = [
    {
      title: "Systolic",
      metric: "mmHg",
      data: sys,
    },
    {
      title: "Diastolic",
      metric: "mmHg",
      data: dia,
    },
    {
      title: "Pulse",
      metric: "bpm",
      data: pul,
    },
    {
      title: "Irregular Beat",
      metric: "N/A",
      data: af,
    },
  ]

  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Flex>
            <Title className="w-full">{item.title}</Title>
            <Flex justifyContent="end" className="-mr-2 -space-x-2">
              {item.title !== "Irregular Beat" ? (
                <>
                  <Icon icon={MoveDownIcon} color="blue" tooltip="Decrease" />
                  <Icon
                    icon={MoveDownRightIcon}
                    color="green"
                    tooltip="Moderate Decrease"
                  />
                  <Icon
                    icon={MoveRightIcon}
                    color="yellow"
                    tooltip="Unchanged"
                  />
                  <Icon
                    icon={MoveUpRightIcon}
                    color="orange"
                    tooltip="Moderate Increase"
                  />
                  <Icon icon={MoveUpIcon} color="red" tooltip="Increase" />
                </>
              ) : (
                <>
                  <Icon icon={HeartIcon} color="green" tooltip="Normal" />
                  <Icon icon={HeartPulseIcon} color="red" tooltip="Irregular" />
                </>
              )}
            </Flex>
          </Flex>
          <Flex className="mt-4">
            <Text>Last {measures.length} readings</Text>
            <Text>{item.metric}</Text>
          </Flex>
          <Tracker data={item.data} className="mt-2" />
          <Flex className="mt-2">
            <Text>{format(new Date(measures[0].measureTime), "MMM d")}</Text>
            <Text>
              {format(
                new Date(measures[measures.length - 1].measureTime),
                "MMM d"
              )}
            </Text>
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}
