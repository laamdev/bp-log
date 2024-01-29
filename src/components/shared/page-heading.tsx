import { ReactNode } from "react"

export const PageHeading = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-4xl font-bold tracking-tighter">{children}</h1>
}
