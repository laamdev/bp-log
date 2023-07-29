import * as React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ActivityIcon, ActivitySquareIcon, HeartIcon } from "lucide-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  privateNav?: NavItem[]
  publicNav?: NavItem[]
}

export const MainNav = ({ privateNav, publicNav }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={publicNav![0].href as string}
        className="flex items-center space-x-2"
      >
        <ActivityIcon className="h-6 w-6 rounded-full bg-foreground text-background" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {/* <SignedIn>
        <nav className="flex gap-6"></nav>
        {privateNav?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </SignedIn> */}
    </div>
  )
}
