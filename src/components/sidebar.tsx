"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Crosshair, History, LampDesk, LayoutGrid, LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { SheetClose } from "@/components/ui/sheet"

export type NavLink = {
  section: string
  links: {
    name: string
    href: string
    icon: LucideIcon
    searchParam?: Record<string, string>
  }[]
}

export const navLinks: NavLink[] = [
  {
    section: "My Library",
    links: [
      {
        name: "All",
        href: "/",
        icon: LayoutGrid
      },
      {
        name: "Read",
        href: "/",
        icon: History,
        searchParam: {
          status: "read"
        }
      },
      {
        name: "Currently Reading",
        href: "/",
        icon: LampDesk,
        searchParam: {
          status: "reading"
        }
      },
      {
        name: "Want to Read",
        href: "/",
        icon: Crosshair,
        searchParam: {
          status: "want"
        }
      }
    ]
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-2 py-4">
        {navLinks?.map(({ section, links }) => (
          <div key={section} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {section}
            </h2>
            <div className="flex flex-col gap-1">
              {links.map(({ name, href, icon: Icon, searchParam }, i) => {
                const fullHref = searchParam ? `${href}?${new URLSearchParams(searchParam)}` : href
                const isActive = pathname === href && searchParams.toString() === new URLSearchParams(searchParam).toString()
                return (
                  <Link key={name + href} href={fullHref} passHref>
                    <SheetClose asChild>
                      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                        <Icon className="mr-2 h-4 w-4" />
                        {name}
                      </Button>
                    </SheetClose>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
