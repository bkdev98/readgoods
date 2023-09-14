import { Skeleton } from "@/components/ui/skeleton";

export default function BookLoading() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full md:w-1/3 items-center gap-2">
        <div className="overflow-hidden rounded-md w-[250px] mb-2">
          <Skeleton className="h-[360px] w-[260px]" />
        </div>
        <Skeleton className="h-10 w-[250px]" />
      </div>
      <div className="flex-auto">
        <div className="space-y-3 flex flex-col gap-4">
          <Skeleton className="w-1/2 h-7" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </div>
    </div>
  )
}