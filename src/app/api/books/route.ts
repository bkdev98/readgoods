import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod";

import prisma from "@/lib/prisma";
import { bookFormSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        publicationYear: true,
        status: true,
      },
      where: {
        userId: session.user.id,
        status: status ? {
          equals: status,
        } : undefined,
      },
    })

    return NextResponse.json(books)
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
    }, {
      status: 500,
    })
  }
}

export async function POST(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const json = await req.json()

    const data = bookFormSchema.parse(json)

    const result = await prisma.book.create({
      data: {
        ...data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      }
    })

    return NextResponse.json(result, {
      status: 201,
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, { status: 422 })
    }

    return NextResponse.json({
      message: error?.message,
    }, {
      status: 500,
    })
  }
}
