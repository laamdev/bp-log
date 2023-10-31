import { ReactNode } from "react"

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="prose dark:prose-invert bg-card mx-auto rounded-xl p-4">
      {children}
    </div>
  )
}
