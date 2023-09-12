"use client"

import Link from "next/link"
import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  return (
    <Link passHref href='/auth'>
      <Button size='sm'>
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    </Link>
  )
}
