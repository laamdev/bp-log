"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Tabs, TabsList } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const dashboardLinks = [
  { label: "Overview", href: "/dashboard/overview" },
  { label: "History", href: "/dashboard/history" },
  { label: "Medication", href: "/dashboard/medication" },
]

export const DashboardNav = () => {
  const pathname = usePathname()
  return (
    <Tabs defaultValue="account" className="mt-4 w-[400px]">
      <TabsList>
        {dashboardLinks.map((dashboardLink) => (
          <Link
            key={dashboardLink.href}
            href={`${dashboardLink.href}`}
            className={cn(
              pathname.includes(dashboardLink.href) &&
                "text-accent-foreground bg-accent",
              "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {dashboardLink.label}
          </Link>
        ))}
        {/* <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger> */}
      </TabsList>

      {/* <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  )
}
