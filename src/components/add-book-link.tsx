"use client"

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function AddBookLink() {
  const searchParams = useSearchParams();

  const href = useMemo(() => {
    const status = searchParams.get("status");
    if (status) {
      return `/add-book?status=${status}`;
    }
    return "/add-book";
  }, [searchParams])

  return (
    <Link passHref href={href}>
      <Button size='sm'>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Book
      </Button>
    </Link>
  )
}
