import { DeleteMedicationDialog } from "@/components/forms-and-dialogs/delete-medication-dialog"
import { UpdateMedicationDialog } from "@/components/forms-and-dialogs/update-medication-dialog"
import { Medication } from "@/lib/db/schema"

export const MedicationCard = ({ medication }: { medication: Medication }) => {
  return (
    <div
      key={medication.id}
      className="bg-background text-foreground relative flex flex-col rounded-xl p-4"
    >
      <div className="flex flex-col">
        <div>
          <h3 className="text-lg font-bold">{medication.name}</h3>
          <p className="flex items-center gap-x-1 font-mono text-sm opacity-75">
            <span>{`${medication.dose} ${medication.unit}`}</span>
            <span>{`-`}</span>
            <span className="capitalize">{medication.time}</span>
          </p>
        </div>
      </div>

      <div className="absolute right-2 top-2 flex gap-x-2.5">
        <UpdateMedicationDialog medication={medication} />

        <DeleteMedicationDialog
          medicationId={medication.id}
          medicationName={medication.name}
        />
      </div>
    </div>
  )
}
