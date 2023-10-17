import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const DetailsCard = ({
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
            <p className="text-3xl font-bold capitalize">{value}</p>
            <span className="text-lg">{unit}</span>
          </>
        ) : (
          <p className="text-3xl font-bold capitalize">N/A</p>
        )}
      </div>
    </Card>
  )
}
