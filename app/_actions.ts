"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { UpdatedMeasure } from "@/types/drizzle"
import { db } from "@/lib/db"
import { Measure, MeasuresTable, MedicationsTable } from "@/lib/db/schema"

// MEASURE

export async function updateMeasure(editedMeasure: UpdatedMeasure) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  try {
    await db
      .update(MeasuresTable)
      .set(editedMeasure)
      .where(eq(MeasuresTable.id, editedMeasure.id))

    revalidatePath("/dashboard/history")
  } catch (error) {
    return { error }
  }
}

export async function deleteMeasure(measureId: string) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to delete a measure" }
  }

  try {
    await db.delete(MeasuresTable).where(eq(MeasuresTable.id, +measureId))

    revalidatePath("/dashboard/history")
    return { message: `Measure deleted` }
  } catch (error) {
    return { error: `Failed to delet measure` }
  }
}

// MEDICATION
export async function addMedication(prevState: any, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  console.log(formData)

  const schema = z.object({
    name: z.coerce.string(),
    time: z.coerce.string(),
    dose: z.coerce.number().positive(),
    unit: z.coerce.string(),
    note: z.coerce.string(),
  })

  const result = schema.safeParse({
    name: formData.get("name"),
    time: formData.get("time"),
    dose: formData.get("dose"),
    unit: formData.get("unit"),
    note: formData.get("note"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const newMedication = {
    userId: userId,
    name: result.data.name,
    dose: result.data.dose,
    unit: result.data.unit,
    time: result.data.time,
    note: result.data.note,
  }

  try {
    await db.insert(MedicationsTable).values(newMedication)

    revalidatePath("/dashboard/medication")
    return { message: `Medication added` }
  } catch (error) {
    return { error: `Failed to add medication` }
  }
}

export async function editMedication(prevState: any, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  const schema = z.object({
    name: z.coerce.string(),
    dose: z.coerce.number().positive(),
    unit: z.coerce.string(),
    time: z.coerce.string(),
    medicationId: z.coerce.number().positive(),
    note: z.coerce.string(),
  })

  const result = schema.safeParse({
    name: formData.get("name"),
    dose: formData.get("dose"),
    unit: formData.get("unit"),
    time: formData.get("time"),
    medicationId: formData.get("medicationId"),
    note: formData.get("note"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const editedMedication = {
    name: result.data.name,
    dose: result.data.dose,
    unit: result.data.unit,
    time: result.data.time,
    note: result.data.note,
  }

  try {
    await db
      .update(MedicationsTable)
      .set(editedMedication)
      .where(eq(MedicationsTable.id, result.data.medicationId))

    revalidatePath("/dashboard/medication")
    return { message: `Medication updated.` }
  } catch (error) {
    return { error: `Failed to update medication.` }
  }
}

export async function deleteMedication(medicationId: number) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  try {
    await db
      .delete(MedicationsTable)
      .where(eq(MedicationsTable.id, medicationId))

    revalidatePath("/dashboard/medication")
    return { message: `Medication added` }
  } catch (error) {
    return { error: `Failed to add medication` }
  }
}

// PROFILE
export async function updateProfile(prevState: any, formData: FormData) {
  const { userId } = await auth()

  const schema = z.object({
    birthday: z.coerce.string(),
    weight: z.coerce.number().positive(),
    height: z.coerce.number().positive(),
    sex: z.coerce.string(),
  })

  const result = schema.safeParse({
    birthday: formData.get("birthday"),
    weight: formData.get("weight"),
    height: formData.get("height"),
    sex: formData.get("sex"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const publicMetadata = {
    publicMetadata: {
      birthday: result.data.birthday,
      weight: result.data.weight,
      height: result.data.height,
      sex: result.data.sex,
    },
  }

  try {
    await clerkClient.users.updateUser(userId!, publicMetadata)
    revalidatePath("/profile")
    return { message: `Profile updated` }
  } catch (error) {
    return { error: `Failed to update profile` }
  }
}
