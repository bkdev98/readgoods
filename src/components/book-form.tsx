"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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
import { Book } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type BookFormValues = z.infer<typeof bookFormSchema>

type BookFormProps = {
  bookId?: Book['id']
}

export function BookForm({ bookId }: BookFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const { data: session } = useSession()

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

  useEffect(() => {
    if (!bookId || !session) return

    const fetchBook = async () => {
      const response = await fetch(`/api/books/${bookId}`)
      const book = await response.json()
      if (!book) {
        toast({
          title: "Something went wrong.",
          description: "We couldn't find the book you were looking for.",
          variant: "destructive",
        })
        router.back()
        return
      }
      setEditingBook(book)
      form.reset(bookFormSchema.parse(book))
    }

    fetchBook()
  }, [bookId, form, router, session])

  const onSubmit = useCallback(async (data: BookFormValues) => {
    setIsLoading(true)
    const response = editingBook
      ? (await fetch(`/api/books/${editingBook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }))
      : (await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }))
    setIsLoading(false)

    if (!response.ok) {
      const { message } = await response.json()
      return toast({
        title: "Something went wrong.",
        description: message,
        variant: "destructive",
      })
    }

    toast({
      title: editingBook
        ? "Your book was updated."
        : "Your book was created.",
      description: editingBook
        ? "Newest changes have been saved."
        : "You can now find it in your library.",
    })

    const book = await response.json()

    form.reset()
    router.back()
    setTimeout(() => {
      if (editingBook) {
        router.refresh()
      } else {
        router.push(`/books/${book.id}`)
      }
    }, 100)
  }, [editingBook, form, router])

  const handleDelete = useCallback(async () => {
    if (!editingBook) {
      return
    }

    setIsLoading(true)
    const response = await fetch(`/api/books/${editingBook.id}`, {
      method: "DELETE",
    })
    setIsLoading(false)

    if (!response.ok) {
      const { message } = await response.json()
      return toast({
        title: "Something went wrong.",
        description: message,
        variant: "destructive",
      })
    }

    toast({
      title: "Your book was deleted.",
      description: "You can no longer find it in your library."
    })

    form.reset()
    router.back()
    setTimeout(() => {
      router.replace("/")
      router.refresh()
    }, 100)
  }, [editingBook, form, router])

  if (bookId && !editingBook) {
    return (
      <div>
        <Loader2 className="animate-spin w-6 h-6 opacity-50" />
      </div>
    )
  }

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
        <div className={cn("flex gap-4", isLoading ? "opacity-50" : "")}>
          <Button type="submit" disabled={isLoading}>
            {editingBook ? "Save Changes" : "Submit"}
          </Button>
          {editingBook && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  Delete Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your book.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className={isLoading ? "opacity-50" : ""} onClick={handleDelete} variant="destructive">
                    Confirm Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </form>
    </Form>
  )
}
