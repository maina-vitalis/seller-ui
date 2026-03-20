import * as React from "react"
import { Layers, Plus, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionIcon } from "@/features/products/components/section-icon"
import type { ProductVariantOption } from "@/features/products/types"

type ProductVariantsCardProps = {
  variantOptions: ProductVariantOption[]
  onVariantOptionsChange: (options: ProductVariantOption[]) => void
}

let _variantId = 0
function nextVariantId() {
  return `var-${Date.now()}-${++_variantId}`
}

export function ProductVariantsCard({
  variantOptions,
  onVariantOptionsChange,
}: Readonly<ProductVariantsCardProps>) {
  function addOption() {
    onVariantOptionsChange([
      ...variantOptions,
      { id: nextVariantId(), name: "", values: [] },
    ])
  }

  function updateName(id: string, name: string) {
    onVariantOptionsChange(
      variantOptions.map((o) => (o.id === id ? { ...o, name } : o))
    )
  }

  function addValue(id: string, value: string) {
    if (!value.trim()) return
    onVariantOptionsChange(
      variantOptions.map((o) =>
        o.id === id && !o.values.includes(value.trim())
          ? { ...o, values: [...o.values, value.trim()] }
          : o
      )
    )
  }

  function removeValue(optionId: string, value: string) {
    onVariantOptionsChange(
      variantOptions.map((o) =>
        o.id === optionId
          ? { ...o, values: o.values.filter((v) => v !== value) }
          : o
      )
    )
  }

  function removeOption(id: string) {
    onVariantOptionsChange(variantOptions.filter((o) => o.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={Layers} />
          <div>
            <CardTitle>Variants</CardTitle>
            <CardDescription>
              Add options like sizes and colors for your product.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {variantOptions.map((option) => (
          <VariantOptionRow
            key={option.id}
            option={option}
            onNameChange={(name) => updateName(option.id, name)}
            onAddValue={(val) => addValue(option.id, val)}
            onRemoveValue={(val) => removeValue(option.id, val)}
            onRemove={() => removeOption(option.id)}
          />
        ))}

        {variantOptions.length < 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            className="w-full border-dashed"
          >
            <Plus className="mr-1.5 size-3.5" />
            Add Option (e.g. Size, Color)
          </Button>
        )}

        {variantOptions.length >= 3 && (
          <p className="text-center text-xs text-muted-foreground">
            Maximum of 3 variant options reached.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

/* ─── variant option row ─── */

function VariantOptionRow({
  option,
  onNameChange,
  onAddValue,
  onRemoveValue,
  onRemove,
}: Readonly<{
  option: ProductVariantOption
  onNameChange: (name: string) => void
  onAddValue: (value: string) => void
  onRemoveValue: (value: string) => void
  onRemove: () => void
}>) {
  const [valueInput, setValueInput] = React.useState("")

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault()
      onAddValue(valueInput)
      setValueInput("")
    }
  }

  return (
    <div className="space-y-3 rounded-lg border bg-muted/15 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Option Name</Label>
          <Select value={option.name} onValueChange={onNameChange}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="e.g. Size, Color..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Size">Size</SelectItem>
              <SelectItem value="Color">Color</SelectItem>
              <SelectItem value="Material">Material</SelectItem>
              <SelectItem value="Style">Style</SelectItem>
              <SelectItem value="Weight">Weight</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          type="button"
          className="mt-5 rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
          title="Remove option"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Values</Label>
        <div className="flex min-h-[34px] flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5">
          {option.values.map((val) => (
            <Badge key={val} variant="outline" className="gap-1 pr-1">
              {val}
              <button
                type="button"
                onClick={() => onRemoveValue(val)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            className="min-w-[60px] flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/50"
            placeholder={
              option.values.length === 0
                ? "Type a value and press Enter"
                : "Add more..."
            }
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (valueInput.trim()) {
                onAddValue(valueInput)
                setValueInput("")
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
