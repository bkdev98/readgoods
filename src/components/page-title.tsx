import { Separator } from "@/components/ui/separator"

export type PageTitleProps = {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageTitle({
  title,
  description,
  action
}: PageTitleProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          {!!description && <p className="text-sm text-muted-foreground">
            {description}
          </p>}
        </div>
        {action}
      </div>
      <Separator className="my-4" />
    </>
  )
}
