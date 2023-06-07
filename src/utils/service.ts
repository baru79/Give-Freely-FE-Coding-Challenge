import { API_URL } from "./constants"
import type { Root } from "./types"

export const getWebsites = async (): Promise<Root> => {
  const API_KEY = process.env.PLASMO_PUBLIC_API_KEY as string
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY
    }
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
}
