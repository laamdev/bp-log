import { format } from "date-fns"

export const now = format(new Date(), "yyyy-MM-dd'T'HH:mm")

export const dateFormatter = (rawDate: string) => {
  const formattedDate = format(new Date(rawDate), "MMM dd 'at' h:mma")

  return formattedDate
}
