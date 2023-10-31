import "@/app/globals.css"

import { ReactNode } from "react"
import { Metadata } from "next"
import localFont from "next/font/local"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { Providers } from "@/app/providers"

const aeonikSans = localFont({
  src: [
    {
      path: "../public/fonts/aeonik-sans/air.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/air-italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/thin-italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/light-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/black-italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-aeonikSans",
})

const aeonikMono = localFont({
  src: [
    {
      path: "../public/fonts/aeonik-mono/light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-mono/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-mono/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonikMono",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
      className={cn(aeonikSans.variable, aeonikMono.variable, "font-sans")}
    >
      <body>
        <Providers>
          <div
            className={cn(
              "bg-background relative mx-auto flex min-h-screen max-w-5xl flex-col p-4 antialiased"
            )}
          >
            <SiteHeader />
            <div className="mx-8 flex-1 py-8">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
