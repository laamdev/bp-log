import { AddMedicationDialog } from "@/components/forms/add-medication-dialog"

export default async function MedicationPage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Medication</h2>
          {/* <div className="mt-1 flex items-center gap-x-2">
            <ClockIcon className="h-4 w-4" />
            {format(new Date(latestMeasure.measureTime!), "MMM dd 'at' h:mma")}
          </div> */}
        </div>
        <AddMedicationDialog />
      </div>
    </div>
  )
}
