import { auth } from "@clerk/nextjs"
import { PillIcon } from "lucide-react"
import { Metadata } from "next"

import { AddMedicationDialog } from "@/components/forms-and-dialogs/add-medication-dialog"
import { MedicationCard } from "@/components/medication/medication-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"
import { fetchAllMedications, fetchMedicationsCount } from "@/lib/data"

export const metadata: Metadata = {
  title: "Medication",
}

export default async function MedicationRoute() {
  const { userId } = await auth()

  if (!userId) {
    return
  }

  const allMedicationsData = fetchAllMedications(userId)
  const medicationsCountData = fetchMedicationsCount(userId)

  const [allMedications, medicationsCount] = await Promise.all([
    allMedicationsData,
    medicationsCountData,
  ])

  return (
    <div>
      <div className="flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0">
        <div>
          <SectionHeading>Your Medications</SectionHeading>
          {allMedications && medicationsCount ? (
            <Tagline icon={<PillIcon className="size-4" />}>
              {`${medicationsCount == 0 ? "No" : medicationsCount} ${`${
                medicationsCount > 1 ? "medications" : "medication"
              }`}
            `}
            </Tagline>
          ) : null}
        </div>
        <AddMedicationDialog />
      </div>

      {medicationsCount == 0 ? (
        <p className="text-muted-foreground mt-8 text-center">
          {`You have no medications logged. Please add one with the above
      button.`}
        </p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {allMedications.map((medication) => (
            <MedicationCard medication={medication} />
          ))}
        </div>
      )}
    </div>
  )
}
