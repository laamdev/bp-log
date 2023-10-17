import { clsx, type ClassValue } from "clsx"
import { differenceInYears, parse, parseISO } from "date-fns"
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
