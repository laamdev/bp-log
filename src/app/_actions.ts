"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { MeasuresTable, MedicationsTable } from "@/lib/db/schema"

// MEASURE

export async function addMeasure(prevState: any, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  const MeasureSchema = z.object({
    sys: z.coerce.number().positive(),
    dia: z.coerce.number().positive(),
    pul: z.coerce.number().positive(),
    measureTime: z.string(),
    af: z.coerce.boolean(),
    cuffLocation: z.string(),
    bodyPosition: z.string(),
  })

  // // const rawFormData = Object.fromEntries(formData.entries())

  // // const CreateMeasure = MeasureSchema.omit({ userId: true })

  const result = MeasureSchema.safeParse({
    sys: formData.get("sys"),
    dia: formData.get("dia"),
    pul: formData.get("pul"),
    measureTime: formData.get("measureTime"),
    af: formData.get("af"),
    cuffLocation: formData.get("cuffLocation"),
    bodyPosition: formData.get("bodyPosition"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const { sys, dia, pul, measureTime, af, cuffLocation, bodyPosition } =
    result.data

  const newMeasure = {
    userId: userId,
    sys: sys,
    dia: dia,
    pp: sys - dia,
    pul: pul,
    measureTime: measureTime,
    af: af,
    cuffLocation: cuffLocation,
    bodyPosition: bodyPosition,
  }

  try {
    await db.insert(MeasuresTable).values(newMeasure)
  } catch (error) {
    return {
      error: "Database Error: Failed to Create Measure.",
    }
  }

  revalidatePath("/dashboard/overview")

  return {
    success: "Database Error: Failed to Create Measure.",
  }
}

export async function updateMeasure(id: string, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to edit a measure." }
  }

  const MeasureSchema = z.object({
    id: z.coerce.number(),
    sys: z.coerce.number().positive(),
    dia: z.coerce.number().positive(),
    pul: z.coerce.number().positive(),
    measureTime: z.string(),
    af: z.coerce.boolean(),
    cuffLocation: z.string(),
    bodyPosition: z.string(),
  })

  const result = MeasureSchema.safeParse({
    id: formData.get("id"),
    sys: formData.get("sys"),
    dia: formData.get("dia"),
    pul: formData.get("pul"),
    measureTime: formData.get("measureTime"),
    af: formData.get("af"),
    cuffLocation: formData.get("cuffLocation"),
    bodyPosition: formData.get("bodyPosition"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const { sys, dia, pul, measureTime, af, cuffLocation, bodyPosition } =
    result.data

  const editedMeasure = {
    sys: sys,
    dia: dia,
    pp: sys - dia,
    pul: pul,
    measureTime: measureTime,
    af: af,
    cuffLocation: cuffLocation,
    bodyPosition: bodyPosition,
  }

  try {
    await db
      .update(MeasuresTable)
      .set(editedMeasure)
      .where(eq(MeasuresTable.id, result.data.id))

    revalidatePath("/dashboard/history")

    return { success: `Measure updated.` }
  } catch (error) {
    return { error: `Failed to edit measure.` }
  }
}

export async function deleteMeasure(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to delete a measure." }
  }

  const MeasureSchema = z.object({
    id: z.coerce.number(),
  })

  const result = MeasureSchema.safeParse({
    id: formData.get("id"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const { id } = result.data

  try {
    await db.delete(MeasuresTable).where(eq(MeasuresTable.id, id))

    revalidatePath("/dashboard/history")
    return { success: "Measure deleted" }
  } catch (error) {
    return { error: `Failed to delete measure` }
  }
}

// MEDICATION
export async function addMedication(prevState: any, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to add a medication." }
  }

  const MedicationSchema = z.object({
    name: z.coerce.string(),
    time: z.coerce.string(),
    dose: z.coerce.number().positive(),
    unit: z.coerce.string(),
    note: z.coerce.string(),
  })

  const result = MedicationSchema.safeParse({
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

  const { name, dose, unit, time, note } = result.data

  const newMedication = {
    userId: userId,
    name: name,
    dose: dose,
    unit: unit,
    time: time,
    note: note,
  }

  try {
    await db.insert(MedicationsTable).values(newMedication)

    revalidatePath("/dashboard/medication")
    return { success: `Medication added` }
  } catch (error) {
    return { error: `Failed to add medication` }
  }
}

export async function updateMedication(prevState: any, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to edit a medication." }
  }

  const MedicationSchema = z.object({
    id: z.coerce.number(),
    name: z.coerce.string(),
    time: z.coerce.string(),
    dose: z.coerce.number().positive(),
    unit: z.coerce.string(),
    note: z.coerce.string(),
  })

  const result = MedicationSchema.safeParse({
    id: formData.get("id"),
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
  const { name, dose, unit, time, note } = result.data

  const editedMedication = {
    name: name,
    dose: dose,
    unit: unit,
    time: time,
    note: note,
  }

  try {
    await db
      .update(MedicationsTable)
      .set(editedMedication)
      .where(eq(MedicationsTable.id, result.data.id))

    revalidatePath("/dashboard/medication")
    return { success: `Medication edited.` }
  } catch (error) {
    return { error: `Failed to edit medication.` }
  }
}

export async function deleteMedication(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to delete a medication." }
  }

  const MedicationSchema = z.object({
    id: z.coerce.number(),
  })

  const result = MedicationSchema.safeParse({
    id: formData.get("id"),
  })

  if (!result.success) {
    let errorMessage = ""
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". "
    })
    return { error: errorMessage }
  }

  const { id } = result.data

  try {
    await db.delete(MedicationsTable).where(eq(MedicationsTable.id, id))

    revalidatePath("/dashboard/medication")
    return { success: "Medication deleted" }
  } catch (error) {
    return { error: `Failed to delete medication` }
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
    return { success: `Profile updated` }
  } catch (error) {
    return { error: `Failed to update profile` }
  }
}
