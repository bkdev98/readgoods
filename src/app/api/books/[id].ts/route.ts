import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod";

import prisma from "@/lib/prisma";
import { bookFormSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
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
        id: params.id,
        userId: session.user.id,
      },
    })

    return NextResponse.json(book)
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
    }, {
      status: 500,
    })
  }
}

async function verifyCurrentUserHasAccessToBook(bookId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return false
  }

  const count = await prisma.book.count({
    where: {
      id: bookId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
