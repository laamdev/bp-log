import { format } from "date-fns"

// // import {
// //   HeartIcon,
// //   HeartPulseIcon,
// //   MoveDownIcon,
// //   MoveDownRightIcon,
// //   MoveRightIcon,
// //   MoveUpIcon,
// //   MoveUpRightIcon,
// // } from "lucide-react"

// // import { dateFormatter } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrackerItemContainer } from "@/components/dashboard/overview/tracker-item-container"

export const TrackerCard = ({
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
              <div className="text-xs">
                {dates[idx] &&
                  format(new Date(`${dates[idx]}`), "MMM dd 'at' h:mma")}
              </div>
              <div className="flex items-baseline gap-x-1">
                <span className="text-lg">{measure}</span>
                <span className="text-xs opacity-75">mmHg</span>
              </div>
              <div>
                {idx !== 0 && (
                  <div className="flex items-baseline gap-x-1">
                    <p>
                      <span>{measure - measures[idx - 1] > 0 && "+"}</span>
                      <span>{measure - measures[idx - 1]}</span>
                    </p>
                    <p className="text-xs">than previous measure</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </TrackerItemContainer>
    </Card>
  )
}
