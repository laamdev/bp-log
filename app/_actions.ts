"use server"

import { revalidatePath } from "next/cache"

import { addMeasure } from "@/lib/actions/measures"
import { updateProfile } from "@/lib/actions/profile"
import { NewMeasure } from "@/lib/db/schema"

export async function addMeasureAction(newMeasure: NewMeasure) {
  await addMeasure(newMeasure)
  revalidatePath("/")
}

export async function updateProfileAction(editedInfo: any) {
  await updateProfile(editedInfo)
  revalidatePath("/profile")
}
