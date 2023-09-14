"use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { Cog, PlusCircle } from "lucide-react";
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

export function EditBookLink({ id, className, ...props }: { id: string } & ButtonProps) {
  return (
    <Link passHref href={`/edit-book/${id}`} className={className}>
      <Button className={className} {...props}>
        <Cog className="w-4 h-4 mr-2" />
        Edit Book
      </Button>
    </Link>
  )
}
