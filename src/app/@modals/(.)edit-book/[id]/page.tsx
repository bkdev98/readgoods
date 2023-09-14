"use client"

import { BookForm } from "@/components/book-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBook({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open onOpenChange={router.back}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2 mb-2">
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <BookForm bookId={params.id} />
      </DialogContent>
    </Dialog>
  )
}
