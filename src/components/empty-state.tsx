import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export type EmptyStateProps = {
  title?: string
  description?: string
  icon?: LucideIcon
  className?: string
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  className,
  action
}: EmptyStateProps): JSX.Element {
  return (
    <div className={cn("flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed", className)}>
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {!!Icon && <Icon className="w-16 h-16 text-muted-foreground" />}
        {!!title && (
          <h3 className="mt-4 text-lg font-semibold">
            {title}
          </h3>
        )}
        {!!description && (
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {!!action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
