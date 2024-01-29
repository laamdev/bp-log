"use client"

import { useAuth } from "@clerk/nextjs"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

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
      <LogOutIcon className="size-4" />
      <span>Log out</span>
    </button>
  )
}
