"use client"

import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { bookFormSchema } from "@/lib/validations"

import { StatusSelect } from "./status-select"

type BookFormValues = z.infer<typeof bookFormSchema>

export function BookForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const defaultValues: Partial<BookFormValues> = useMemo(() => ({
    title: "",
    author: "",
    synopsis: "",
    cover: "",
    publicationYear: "",
    status: searchParams.get("status") || "",
  }), [searchParams])

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = useCallback(async (data: BookFormValues) => {
    setIsLoading(true)
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    setIsLoading(false)

    if (!response.ok) {
      const { message } = await response.json()
      return toast({
        title: "Something went wrong.",
        description: message || "Your book was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      title: "Your book was created.",
      description: "You can now find it in your library.",
    })

    const book = await response.json()

    form.reset()

    router.back()

    setTimeout(() => router.push(`/books/${book.id}`), 100)
  }, [form, router])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="The Metamorphosis" {...field} />
              </FormControl>
              <FormDescription>
                Book title you want to add to your library.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="block space-y-6 lg:flex lg:space-y-0 lg:gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Franz Kafka" {...field} />
                </FormControl>
                <FormDescription>
                  The author of this book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Publication Year
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="1915"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sysnopis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Gregor turns into a bug, it was not a smart move."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description of the book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-4">
                Status
              </FormLabel>
              <FormControl>
                <StatusSelect {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
