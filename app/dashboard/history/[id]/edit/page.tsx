import { Metadata } from "next"

import { fetchMeasureById } from "@/lib/data"
import { UpdateMeasureForm } from "@/components/forms-and-dialogs/update-measure-form"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "Edit Measure",
}

export default async function EditMeasureRoute({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  const measure = await fetchMeasureById(id)

  return (
    <div className="bg-card rounded-xl p-4">
      <SectionHeading>Edit Measure</SectionHeading>

      <UpdateMeasureForm measure={measure} />
    </div>
  )
}
