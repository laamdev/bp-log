import * as React from "react"
import Link from "next/link"
import { ActivityIcon } from "lucide-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

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
        <ActivityIcon className="bg-foreground text-background h-6 w-6 rounded-full" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  )
}
