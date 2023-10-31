import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Card, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrackerItemContainer } from "@/components/dashboard/overview/tracker-item-container"
import { InputUnit } from "@/components/forms-and-dialogs/input-unit"

export const RecentMeasuresTrackerCard = ({
  label,
  measures,
  dates,
}: {
  label: string
  measures: number[]
  dates: any[]
}) => {
  return (
    <Card className="bg-background p-4">
      <CardTitle>{label}</CardTitle>
      <TrackerItemContainer>
        {measures.map((measure: number, idx: number) => (
          <Popover key={idx}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "tw-transition h-12 cursor-pointer rounded hover:scale-95",
                  {
                    "bg-blue-500": measure - measures[idx - 1] < -10,
                    "bg-green-500":
                      measure - measures[idx - 1] < 0 &&
                      measure - measures[idx - 1] >= -10,
                    "bg-yellow-500": measure - measures[idx - 1] === 0,
                    "bg-orange-500":
                      measure - measures[idx - 1] > 0 &&
                      measure - measures[idx - 1] <= 10,
                    "bg-red-500": measure - measures[idx - 1] > 10,
                    "bg-zinc-500": !measures[idx - 1],
                  }
                )}
              />
            </PopoverTrigger>
            <PopoverContent className="flex w-52 flex-col gap-y-4">
              <div className="text-sm font-medium">
                {dates[idx] &&
                  format(new Date(`${dates[idx]}`), "MMM dd 'at' h:mma")}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-x-1">
                  <span className="text-xl font-bold">{measure}</span>
                  <InputUnit>mmHg</InputUnit>
                </div>
                <div>
                  {idx !== 0 && (
                    <div className="flex items-baseline gap-x-1">
                      <p className="text-xl font-bold">
                        <span>{measure - measures[idx - 1] > 0 && "+"}</span>
                        <span>{measure - measures[idx - 1]}</span>
                      </p>
                      <InputUnit>variance</InputUnit>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </TrackerItemContainer>
    </Card>
  )
}
