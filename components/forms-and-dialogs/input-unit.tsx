import { ReactNode } from "react"

export const InputUnit = ({ children }: { children: ReactNode }) => {
  return <p className="mt-1 font-mono text-xs opacity-75">{children}</p>
}
