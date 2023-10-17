import { Metadata } from "next"
import { auth } from "@clerk/nextjs"

import { OverviewPage } from "@/components/pages/overview-page"

export const metadata: Metadata = {
  title: "Overview",
}

export default async function OverviewRoute() {
  const { userId } = auth()

  if (!userId) return <div>Not authorized...</div>

  return <OverviewPage />
}

// // export const revalidate = 10
// // export const runtime = "edge" // nodejs
// // export const preferredRegion = "fra1"
