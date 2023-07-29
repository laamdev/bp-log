import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ActivityIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ProfileMenu } from "@/components/auth/profile-menu"
// // import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* <MainNav
          privateNav={siteConfig.privateNav}
          publicNav={siteConfig.publicNav}
        /> */}
        <Link href={`/`} className="flex items-center space-x-2">
          <ActivityIcon className="h-6 w-6 rounded-full bg-foreground text-background" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SignedIn>
              <ProfileMenu />
            </SignedIn>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
