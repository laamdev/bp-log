import { clsx, type ClassValue } from "clsx"
import { differenceInYears, format, parse, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const calculateAge = (dob: string) => {
  const date = parseISO(dob)
  const age = differenceInYears(new Date(), date)
  return age
}

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com" // https://v2ds.netlify.app

  return base_url
}

export const calculateMap = (sys: number, dia: number) => {
  return 2 * sys + dia / 3
}

export const calculatePp = (sys: number, dia: number) => {
  return sys - dia
}

export const now = format(new Date(), "yyyy-MM-dd'T'HH:mm")

export const dateFormatter = (rawDate: string) => {
  const formattedDate = format(new Date(rawDate), "MMM dd 'at' h:mma")

  return formattedDate
}
