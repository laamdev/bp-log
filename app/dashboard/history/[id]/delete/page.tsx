import { Metadata } from "next"

import { fetchMeasureById } from "@/lib/data"
import { DeleteMeasureForm } from "@/components/forms-and-dialogs/delete-measure-form"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "Delete Measure",
}

export default async function DeleteMeasureRoute({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  const measure = await fetchMeasureById(id)

  return (
    <div className="bg-card rounded-xl p-4">
      <SectionHeading>Delete Measure</SectionHeading>

      <DeleteMeasureForm measure={measure} />
    </div>
  )
}
