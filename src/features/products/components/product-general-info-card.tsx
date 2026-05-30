import { Package } from "lucide-react"
import { Controller } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { SectionIcon } from "@/features/products/components/section-icon"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"

type Props = {
  form: UseFormReturn<ProductFormValues>
}

export function ProductGeneralInfoCard({ form }: Readonly<Props>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={Package} />
          <div>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Basic product details that customers will see.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Product Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g. Premium Wireless Headphones"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/120 characters
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="shortDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="shortDescription">
                  Short Description
                </FieldLabel>
                <Input
                  {...field}
                  id="shortDescription"
                  placeholder="A brief one-liner that appears in product cards..."
                  maxLength={160}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/160 characters — shown in product
                    listings
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="description">Full Description</FieldLabel>
                <Tabs defaultValue="write">
                  <TabsList variant="line" className="mb-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Describe your product in detail..."
                      rows={6}
                      className="resize-y"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-38 rounded-md border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                      {field.value ||
                        "Nothing to preview yet. Start writing your product description."}
                    </div>
                  </TabsContent>
                </Tabs>
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
