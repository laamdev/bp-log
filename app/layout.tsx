import "@/app/globals.css"

import { ReactNode } from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { telefraf } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { Providers } from "@/app/providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(telefraf.variable, "font-sans")}
    >
      <body>
        <Providers>
          <div
            className={cn(
              "bg-background relative mx-auto flex min-h-screen max-w-5xl flex-col p-4 antialiased"
            )}
          >
            <SiteHeader />
            <div className="flex-1 py-8">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
