import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="px-8 py-6">{children}</div>
}
