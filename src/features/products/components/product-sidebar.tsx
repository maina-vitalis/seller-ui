import * as React from "react"
import { X, Tags } from "lucide-react"
import { Controller, useWatch } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"
import type { ProductStatus } from "@/features/products/types"

type FormProp = {
  form: UseFormReturn<ProductFormValues>
}

const CATEGORIES = [
  "Electronics",
  "Clothing & Apparel",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Food & Beverages",
  "Health & Wellness",
  "Automotive",
  "Jewelry & Accessories",
  "Office Supplies",
  "Pet Supplies",
  "Garden & Outdoor",
  "Other",
]

/* ─── status card ─── */

export function ProductStatusCard({ form }: FormProp) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="DRAFT">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-amber-500" />
                      Draft
                    </div>
                  </SelectItem>
                  <SelectItem value="ARCHIVED">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-gray-400" />
                      Archived
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                {field.value === "ACTIVE" &&
                  "Product will be visible in your store."}
                {field.value === "DRAFT" && "Product is hidden from customers."}
                {field.value === "ARCHIVED" &&
                  "Product is hidden and won't appear in admin lists."}
              </p>
            </>
          )}
        />
      </CardContent>
    </Card>
  )
}

/* ─── organization card ─── */

export function ProductOrganizationCard({
  form,
  tagInput,
  onTagInputChange,
}: FormProp & { tagInput: string; onTagInputChange: (v: string) => void }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="category"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="brand"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="brand">Brand</FieldLabel>
                <Input {...field} id="brand" placeholder="e.g. Sony, Nike..." />
              </Field>
            )}
          />

          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => {
              function addTag() {
                const tag = tagInput.trim()
                if (tag && !field.value.includes(tag)) {
                  field.onChange([...field.value, tag])
                  onTagInputChange("")
                }
              }

              function removeTag(tag: string) {
                field.onChange(field.value.filter((t) => t !== tag))
              }

              function handleKeyDown(e: React.KeyboardEvent) {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
                if (
                  e.key === "Backspace" &&
                  !tagInput &&
                  field.value.length > 0
                ) {
                  removeTag(field.value[field.value.length - 1])
                }
              }

              return (
                <Field>
                  <FieldLabel>
                    <Tags className="mr-1 inline size-3.5" />
                    Tags
                  </FieldLabel>
                  <div className="flex min-h-9.5 flex-wrap items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5 transition-colors focus-within:ring-2 focus-within:ring-ring/50">
                    {field.value.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="size-2.5" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      type="text"
                      className="min-w-20 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                      placeholder={
                        field.value.length === 0
                          ? "Type and press Enter..."
                          : "Add more..."
                      }
                      value={tagInput}
                      onChange={(e) => onTagInputChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={addTag}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Press Enter to add. Tags improve store search &amp;
                    filtering.
                  </p>
                </Field>
              )
            }}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

/* ─── flags card ─── */

export function ProductFlagsCard({ form }: FormProp) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Additional Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Controller
          name="isFeatured"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <div>
                <FieldLabel htmlFor="isFeatured" className="text-sm">
                  Featured Product
                </FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Show on homepage &amp; featured sections.
                </p>
              </div>
              <Switch
                id="isFeatured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />

        <Separator />

        <Controller
          name="isDigital"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <div>
                <FieldLabel htmlFor="isDigital" className="text-sm">
                  Digital Product
                </FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Downloadable — no physical shipping.
                </p>
              </div>
              <Switch
                id="isDigital"
                checked={field.value}
                onCheckedChange={(v) => {
                  field.onChange(v)
                  if (v) form.setValue("requiresShipping", false)
                }}
              />
            </div>
          )}
        />
      </CardContent>
    </Card>
  )
}

/* ─── quick summary card ─── */

export function ProductSummaryCard({ form }: FormProp) {
  const name = useWatch({ control: form.control, name: "name" })
  const price = useWatch({ control: form.control, name: "price" })
  const stock = useWatch({ control: form.control, name: "stock" })
  const images = useWatch({ control: form.control, name: "images" })
  const status = useWatch({
    control: form.control,
    name: "status",
  }) as ProductStatus

  return (
    <Card className="border-dashed">
      <CardContent className="pt-5">
        <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Quick Summary
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="max-w-45 truncate font-medium">{name || "—"}</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Price</dt>
            <dd className="font-medium">
              {price ? `${Number(price).toFixed(2)}` : "—"}
            </dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Stock</dt>
            <dd className="font-medium">{stock || "—"}</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Images</dt>
            <dd className="font-medium">{images?.length ?? 0}</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <Badge
                variant={
                  status === "ACTIVE"
                    ? "default"
                    : status === "DRAFT"
                      ? "secondary"
                      : "outline"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
