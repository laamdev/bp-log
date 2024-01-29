import { ReactNode } from "react"

export const Tagline = ({
  icon,
  children,
}: {
  icon?: ReactNode
  children: ReactNode
}) => {
  return (
    <div className="mt-1 flex items-center gap-x-1.5 font-mono text-sm opacity-75">
      {icon} {children}
    </div>
  )
}
