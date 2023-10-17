import { Measure } from "./db/schema"
import { checkEnvironment } from "./utils"

export const userMeasuresEndpoint = "/api/user-measures"
export const measureEndpoint = "/api/measure"

export const getMeasureById = async (measureId: string) => {
  const response = await fetch(
    checkEnvironment().concat(`/api/measure/${measureId}`),
    {
      method: "GET",
    }
  )

  return response.json()
}

export const getAllUserMeasures = async () => {
  const response = await fetch(userMeasuresEndpoint, {
    method: "GET",
  })

  return response.json()
}

// ADD MEASURE

const addMeasureApiCall = async (newMeasure: any) => {
  const response = await fetch(userMeasuresEndpoint, {
    method: "POST",
    body: JSON.stringify(newMeasure),
  })

  return response.json()
}

export const addMeasureOptions = (newMeasure: any, allUserMeasures: any) => {
  return {
    optimisticData: [...allUserMeasures, newMeasure],
    // // populateCache: (addedMeasure: any, measures: any) => {
    // //   return [...allUserMeasures, addedMeasure]
    // // },
    rollbackOnError: true,
    populateCache: true,
    revalidate: true,
  }
}

export const addMeasure = async (newMeasure: any, allUserMeasures: any) => {
  const addedMeasure = await addMeasureApiCall(newMeasure)

  return [...allUserMeasures, addedMeasure]
}

// EDIT MEASURE

export const editMeasure = async (
  editedMeasure: Measure,
  measureId: string,
  url: string
) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ editedMeasure, measureId }),
  })

  return response.json()
}
