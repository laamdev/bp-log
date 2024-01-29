import { ReactNode } from "react"

export const SectionHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-2xl font-medium">{children}</h2>
}
