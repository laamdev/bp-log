import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-center">{children}</div>
  // return <div className="grid gap-4 md:grid-cols-2">{children}</div>
}
