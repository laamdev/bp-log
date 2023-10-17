import { number } from "zod"

export interface UserMeasureCount {
  count: number
}

export interface UpdatedMeasure {
  id: number
  sys: number
  dia: number
  pp: number
  pul: number
  af: boolean | null
  measureTime: string | null
  // // updatedAt: string | null
}

export interface Measure {
  af: boolean
  bodyPosition: string
  createdAt: string
  cuffLocation: string
  dia: number
  id: number
  measureTime: string
  pp: number
  pul: number
  sys: number
  userId: string
}
