"use client"

import { useState } from "react"
import { PillIcon } from "lucide-react"

import { Medication } from "@/lib/db/schema"
import { AddMedicationDialog } from "@/components/medication/add-medication-dialog"
import { DeleteMedicationDialog } from "@/components/medication/delete-medication-dialog"
import { EditMedicationDialog } from "@/components/medication/edit-medication-dialog"
import { SectionHeading } from "@/components/shared/section-heading"

type MedicationPageProps = {
  allUserMedications: Medication[]
}

export const MedicationPage = ({ allUserMedications }: MedicationPageProps) => {
  const medicationCount = allUserMedications.length

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  return (
    <div className="bg-card rounded-xl p-4">
      <div className="flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0">
        <SectionHeading>Your Medications</SectionHeading>
        {allUserMedications && medicationCount ? (
          <div className="mt-1 flex items-center gap-x-2 text-sm">
            <PillIcon className="h-4 w-4" />

            <span>
              {`${medicationCount} ${`${
                medicationCount > 1 ? "medications" : "medication"
              }`}
                `}
            </span>
          </div>
        ) : null}
        <AddMedicationDialog />
      </div>

      {!!allUserMedications.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {allUserMedications.map((medication) => (
            <div
              key={medication.id}
              className="bg-background text-foreground relative flex flex-col rounded-xl p-4"
            >
              <div className="flex flex-col">
                <div>
                  <h3 className="text-log font-medium">{medication.name}</h3>
                  <p className="opacity-70">{`${medication.dose} ${medication.unit}`}</p>
                </div>
              </div>

              <div className="bg-card mt-4 flex justify-between rounded-full">
                <div></div>
                <div className="flex justify-end gap-x-2">
                  <EditMedicationDialog
                    openEditDialog={openEditDialog}
                    setOpenEditDialog={setOpenEditDialog}
                    medication={medication}
                  />
                  <DeleteMedicationDialog
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    medicationId={medication.id}
                    medicationName={medication.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-8 text-center">
          {`You have no medications logged. Please add one with the above
            button.`}
        </p>
      )}
    </div>
  )
}
