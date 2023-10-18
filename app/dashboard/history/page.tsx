import { Metadata } from "next"
import { auth } from "@clerk/nextjs"

import { HistoryPage } from "@/components/pages/history-page"

export const metadata: Metadata = {
  title: "History",
}

export default async function HistoryRoute() {
  const { userId } = auth()

  if (!userId) return <div>Not Authorized</div>

  return <HistoryPage />
}
