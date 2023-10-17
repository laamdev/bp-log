import { Metadata } from "next"
import { auth } from "@clerk/nextjs"
import { mutate } from "swr"

import { Measure } from "@/lib/db/schema"
import { useToast } from "@/components/ui/use-toast"
import { MeasurePage } from "@/components/pages/measure-page"

export const metadata: Metadata = {
  title: "Measure",
}

export default async function MeasureRoute({
  params,
}: {
  params: { id: string }
}) {
  const { userId } = auth()
  if (!userId) return <div>Not authorized...</div>

  return <MeasurePage measureId={params.id} />
}
