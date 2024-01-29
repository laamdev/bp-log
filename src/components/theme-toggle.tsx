"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Button
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Icons.sun className="tw-transition absolute size-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        <Icons.moon className="tw-transition absolute size-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
