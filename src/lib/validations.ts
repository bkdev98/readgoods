import * as z from "zod"

export const bookFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long.",
    })
    .max(50, {
      message: "Title must be at most 50 characters long.",
    }),
  author: z
    .string()
    .min(2, {
      message: "Minimum of 2 characters.",
    })
    .max(50, {
      message: "Maximum of 50 characters.",
    }),
  synopsis: z
    .string()
    .min(2, {
      message: "Sysnopis must be at least 2 characters long.",
    })
    .max(250, {
      message: "Sysnopis must be at most 250 characters long.",
    }),
  cover: z.string().optional(),
  publicationYear: z.string().optional(),
  status: z.string().optional(),
})
