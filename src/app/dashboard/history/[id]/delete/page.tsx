import { Metadata } from "next"
import { format } from "date-fns"
import { ClockIcon } from "lucide-react"

import { fetchMeasureById } from "@/lib/data"
import { DetailsSection } from "@/components/dashboard/history/details-section"
import { DeleteMeasureForm } from "@/components/forms-and-dialogs/delete-measure-form"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SectionHeading } from "@/components/shared/section-heading"
import { Tagline } from "@/components/shared/tagline"

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
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "History", href: "/dashboard/history" },
          {
            label: "Delete",
            href: `/dashboard/history/${id}/delete`,
            active: true,
          },
        ]}
      />
      <div className="bg-card rounded-xl p-4">
        <SectionHeading>{`Delete Measure`}</SectionHeading>
        <Tagline icon={<ClockIcon className="h-4 w-4" />}>
          {format(new Date(`${measure.measureTime}`), "MMM dd 'at' h:mma")}
        </Tagline>

        <DetailsSection measure={measure} />

        <DeleteMeasureForm measure={measure} />
      </div>
    </main>
  )
}
