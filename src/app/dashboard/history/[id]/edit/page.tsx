import { Metadata } from "next"

import { fetchMeasureById } from "@/lib/data"
import { UpdateMeasureForm } from "@/components/forms-and-dialogs/update-measure-form"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
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
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "History", href: "/dashboard/history" },
          {
            label: "Edit Measure",
            href: `/dashboard/history/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="bg-card rounded-xl p-4">
        <SectionHeading>Edit Measure</SectionHeading>

        <UpdateMeasureForm measure={measure} />
      </div>
    </main>
  )
}
