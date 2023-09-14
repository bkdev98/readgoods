"use client"

import * as React from "react"
import {
  CheckCircle,
  Crosshair,
  LampDesk,
  LucideIcon,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
  icon: LucideIcon
}

const statuses: Status[] = [
  {
    value: "want",
    label: "Want to Read",
    icon: Crosshair,
  },
  {
    value: "reading",
    label: "Currently Reading",
    icon: LampDesk,
  },
  {
    value: "read",
    label: "Read",
    icon: CheckCircle,
  },
]

export type StatusSelectProps = Omit<ButtonProps, 'value' | 'onChange'> & {
  value?: string | null
  onChange?: (value?: string) => void
}

const StatusSelect = React.forwardRef<HTMLInputElement, StatusSelectProps>(({
  value,
  onChange,
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false)

  const selectedStatus = React.useMemo(() => statuses.find(
    (status) => status.value === value
  ), [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-start", props.className)}
          {...props}
        >
          {selectedStatus ? (
            <>
              <selectedStatus.icon className="mr-2 h-4 w-4" />
              {selectedStatus.label}
            </>
          ) : (
            <>Set status</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => {
                    onChange?.(value)
                    setOpen(false)
                  }}
                >
                  <status.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      status.value === selectedStatus?.value
                        ? "opacity-100"
                        : "opacity-40"
                    )}
                  />
                  <span>{status.label}</span>
                </CommandItem>
              ))}

              <CommandItem
                onSelect={(value) => {
                  onChange?.(undefined)
                  setOpen(false)
                }}
              >
                <X className="mr-2 h-4 w-4 opacity-40" />
                <span>Clear status</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

StatusSelect.displayName = "StatusSelect"

export { StatusSelect }
