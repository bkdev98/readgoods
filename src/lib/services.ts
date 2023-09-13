import { Book } from "@prisma/client"
import { headers } from "next/headers"
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

/**
 * Demonstrate fetch from API Routes
 * https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */
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

/**
 * Direct fetch from Prisma
 */
export async function getBook(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const book = await prisma.book.findUnique({
    select: {
      id: true,
      title: true,
      author: true,
      publicationYear: true,
      status: true,
      synopsis: true,
    },
    where: {
      id,
      userId: session.user.id,
    },
  })

  return book
}
