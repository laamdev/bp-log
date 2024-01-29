import { Card, CardTitle } from "@/components/ui/card"
import { calculateAge } from "@/lib/utils"

export const AgeCard = ({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit?: string
}) => {
  return (
    <Card className="flex flex-col justify-between p-4">
      <CardTitle>{label}</CardTitle>
      <div className="mt-4 flex items-baseline gap-x-1">
        {value ? (
          <>
            <p className="text-3xl font-bold capitalize">
              {calculateAge(value)}
            </p>
            <span className="text-lg">{unit}</span>
          </>
        ) : (
          <p className="text-3xl font-bold capitalize">N/A</p>
        )}
      </div>
    </Card>
  )
}
