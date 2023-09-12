"use client"

import { BookForm } from "@/components/book-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddBook() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: session } = useSession()

  if (!isMounted) {
    return null;
  }

  if (!session) {
    router.replace('/')
    return null
  }

  return (
    <Dialog open onOpenChange={router.back}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2 mb-2">
          <DialogTitle>New Book</DialogTitle>
          <DialogDescription>
            Add a new book to your library
          </DialogDescription>
        </DialogHeader>
        <BookForm />
      </DialogContent>
    </Dialog>
  )
}
