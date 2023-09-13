import { Book } from "@prisma/client"
import { headers } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getBooks(status?: string | string[]) {
  const response = await fetch(status
    ? `${BASE_URL}/api/books?status=${status instanceof Array ? status.join(',') : status}`
    : `${BASE_URL}/api/books`, {
    // https://pilcrow.vercel.app/blog/nextjs-why
    headers: Object.fromEntries(headers()),
  })

  const books = await response.json() as Book[]

  return books || []
}
