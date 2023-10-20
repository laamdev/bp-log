"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { LogOutIcon } from "lucide-react"

export const SignOutBtn = () => {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <button
      onClick={() => {
        signOut()
        router.push("/")
      }}
      className="flex items-center gap-x-2"
    >
      <LogOutIcon className="h-4 w-4" />
      <span>Log out</span>
    </button>
  )
}
