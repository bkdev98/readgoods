import { cn } from "@/lib/utils";
import { Library } from "lucide-react";
import Link from "next/link";

export function Logo({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <Link href='/' className={cn("flex items-center gap-2 h-10", className)} {...props}>
      <Library />
      <h1 className="font-semibold text-lg">
        Readgoods
      </h1>
    </Link>
  )
}
