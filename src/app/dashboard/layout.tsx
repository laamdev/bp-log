import { currentUser, SignedIn, SignedOut } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { PageHeading } from "@/components/shared/page-heading"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user: User | null = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <>
      <SignedIn>
        <div>
          <PageHeading>{`${user?.firstName}'s Dashboard`}</PageHeading>
          <DashboardNav />
          <div className="mt-8">{children}</div>
        </div>
      </SignedIn>

      <SignedOut>
        <p>Please sign in or register!</p>
      </SignedOut>
    </>
  )
}
