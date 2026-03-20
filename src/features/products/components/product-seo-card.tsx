import { Search } from "lucide-react"
import { Controller, useWatch } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { SectionIcon } from "@/features/products/components/section-icon"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"

type Props = { form: UseFormReturn<ProductFormValues> }

export function ProductSeoCard({ form }: Props) {
  const name = useWatch({ control: form.control, name: "name" })
  const shortDescription = useWatch({ control: form.control, name: "shortDescription" })
  const seoTitle = useWatch({ control: form.control, name: "seoTitle" })
  const seoDescription = useWatch({ control: form.control, name: "seoDescription" })
  const seoSlug = useWatch({ control: form.control, name: "seoSlug" })

  const titlePreview = seoTitle || name || "Product Title"
  const descPreview = seoDescription || shortDescription || "Product description will appear here..."
  const slugPreview = seoSlug || "product-url-slug"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={Search} />
          <div>
            <CardTitle>Search Engine Optimization</CardTitle>
            <CardDescription>
              Customize how this product appears in search results.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border bg-muted/20 p-4">
          <p className="mb-0.5 text-xs text-muted-foreground">Search engine preview</p>
          <p className="truncate text-base font-medium text-blue-600 dark:text-blue-400">
            {titlePreview}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            yourstore.com/products/{slugPreview}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{descPreview}</p>
        </div>

        <FieldGroup>
          <Controller
            name="seoTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="seoTitle">SEO Title</FieldLabel>
                <Input
                  {...field}
                  id="seoTitle"
                  maxLength={70}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/70 characters
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="seoDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="seoDescription">Meta Description</FieldLabel>
                <Textarea
                  {...field}
                  id="seoDescription"
                  placeholder="Brief summary for search engines..."
                  rows={3}
                  maxLength={160}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/160 characters
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="seoSlug"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="seoSlug">URL Handle</FieldLabel>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="shrink-0">yourstore.com/products/</span>
                  <Input
                    {...field}
                    id="seoSlug"
                    onChange={(e) =>
                      field.onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
                    }
                    placeholder="product-url-handle"
                    className="font-mono text-xs"
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
