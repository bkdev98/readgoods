import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import { Marble } from "@/components/marble";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Book
  width?: number
  height?: number
}

export function BookCard({ data, className, width, height, ...props }: BookCardProps) {
  return (
    <Link href={`/books/${data.id}`}>
      <div className={cn(`space-y-3 w-[${width}px]`, className)} {...props}>
        <div className={`overflow-hidden rounded-md w-[${width}px]`}>
          <Marble
            name={data.title}
            width={width || 170}
            height={height || 240}
            colors={['#44749D', '#C6D4E1', '#FFFFFF', '#EBE7E0', '#BDB8AD']}
            className="h-auto w-auto object-cover transition-all hover:scale-110"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium leading-none line-clamp-1 h-5">
            {data.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{data.author}, {data.publicationYear}</p>
        </div>
      </div>
    </Link>
  )
}

BookCard.Skeleton = function BookCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md w-[170px] h-[240px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-1 text-sm">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  )
}
