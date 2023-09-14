"use client"

import { useCallback } from "react";
import { StatusSelect, StatusSelectProps } from "@/components/status-select";
import { Book } from "@prisma/client";
import { toast } from "@/components/ui/use-toast"
import { getLibraryTitle } from "@/lib/common";
import { useRouter } from "next/navigation";

export function SetStatusButton({ editingBook, ...props }: StatusSelectProps & { editingBook: Book }) {
  const router = useRouter()

  const handleUpdateStatus = useCallback(async (value?: string) => {
    const response = await fetch(`/api/books/${editingBook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value || null,
      }),
    })
    if (!response.ok) {
      const { message } = await response.json()
      return toast({
        title: "Something went wrong.",
        description: message,
        variant: "destructive",
      })
    }

    router.refresh()

    toast({
      title: "Update status success.",
      description: !value ? "Your book status has been reset." : `Your book status has been updated to ${getLibraryTitle({ status: value }).title}.`
    })
  }, [editingBook.id, router])

  return (
    <StatusSelect value={editingBook.status} variant='default' onChange={handleUpdateStatus} className="w-full max-w-[250px]" {...props} />
  )
}
