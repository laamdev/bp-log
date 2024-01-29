import { z } from "zod"

export const MedicationSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: "The medication name must be at least 1 character long.",
    })
    .max(100, {
      message: "The medication name must be at most 100 characters long.",
    }),
  dose: z.number().min(1, {
    message: "The dose must be at least 1 unit.",
  }),
  unit: z.string(),
  time: z.string(),
})

export type Medication = z.infer<typeof MedicationSchema>
