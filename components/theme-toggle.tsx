"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="fixed bottom-2 right-2 z-50 flex items-center justify-center">
      <Button
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
