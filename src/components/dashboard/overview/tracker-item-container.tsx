import { ReactNode } from "react"

export const TrackerItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auto-cols-2fr mt-4 grid grid-flow-col gap-x-2">
      {children}
    </div>
  )
}
