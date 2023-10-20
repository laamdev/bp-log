import Link from "next/link"
import { ActivityIcon } from "lucide-react"

import { ProfileMenu } from "@/components/shared/profile-menu"

export const SiteHeader = () => {
  return (
    <header className="bg-card sticky top-0 z-40 w-full rounded-2xl">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href={`/`} className="flex items-center space-x-2">
          <ActivityIcon className="bg-primary text-primary-foreground h-8 w-8 rounded-full" />
          {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ProfileMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}
