import { ReactNode } from "react"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className="text-5xl font-bold tracking-tighter">
        Personal Dashboard
      </h1>
      <DashboardNav />
      <div className="mt-12">{children}</div>
    </div>
  )
}
