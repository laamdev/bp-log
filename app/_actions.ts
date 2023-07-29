"use server"

import { revalidatePath } from "next/cache"

import { UpdatedMeasure } from "@/types/drizzle"
import { addMeasure, updateMeasure } from "@/lib/actions/measures"
import { updateProfile } from "@/lib/actions/profile"
import { NewMeasure } from "@/lib/db/schema"

export async function addMeasureAction(newMeasure: NewMeasure) {
  await addMeasure(newMeasure)
  revalidatePath("/dashboard/overview")
}

export async function updateMeasureAction(editedMeasure: UpdatedMeasure) {
  await updateMeasure(editedMeasure)
  revalidatePath("/dashboard")
}

export async function updateProfileAction(editedInfo: any) {
  await updateProfile(editedInfo)
  revalidatePath("/profile")
}
