import type { ElementType } from "react"

export function SectionIcon({ icon: Icon }: Readonly<{ icon: ElementType }>) {
  return (
    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="size-4" />
    </div>
  )
}
