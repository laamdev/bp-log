"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const dashboardLinks = [
  { label: "Overview", href: "/dashboard/overview" },
  { label: "History", href: "/dashboard/history" },
  { label: "Medication", href: "/dashboard/medication" },
]

export const DashboardNav = () => {
  const pathname = usePathname()

  return (
    <div className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {dashboardLinks.map((dashboardLink) => (
        <Link
          key={dashboardLink.href}
          href={`${dashboardLink.href}`}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            dashboardLink.href === pathname
              ? "bg-background text-foreground shadow"
              : ""
          )}
        >
          {dashboardLink.label}
        </Link>
      ))}
    </div>
  )
}
