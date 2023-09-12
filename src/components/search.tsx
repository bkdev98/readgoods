import { Input, InputProps } from "@/components/ui/input";

export function Search(props: InputProps) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className="md:w-[150px] lg:w-[200px] h-8"
      {...props}
    />
  )
}
