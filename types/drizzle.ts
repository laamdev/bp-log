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
