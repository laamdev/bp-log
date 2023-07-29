import React, { ReactNode } from "react"

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="px-8 py-6">{children}</div>
}
