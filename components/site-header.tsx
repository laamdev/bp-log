import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { ProfileMenu } from "./auth/profile-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          privateNav={siteConfig.privateNav}
          publicNav={siteConfig.publicNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SignedOut>
              <Link href="/sign-in">Sign In</Link>
              <Link href="/sign-up">Sign Up</Link>
            </SignedOut>
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
