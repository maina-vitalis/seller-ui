import { Layers } from "lucide-react"
import { Controller, useWatch } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { SectionIcon } from "@/features/products/components/section-icon"
import { FieldHint } from "@/features/products/components/field-hint"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"

type Props = { form: UseFormReturn<ProductFormValues> }

export function ProductInventoryCard({ form }: Readonly<Props>) {
  const trackInventory = useWatch({
    control: form.control,
    name: "trackInventory",
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={Layers} />
          <div>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              Track stock levels and manage availability.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Controller
          name="trackInventory"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <div>
                <FieldLabel htmlFor="trackInventory" className="text-sm">
                  Track Inventory
                </FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Automatically adjust stock when orders are placed.
                </p>
              </div>
              <Switch
                id="trackInventory"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />

        {trackInventory && (
          <>
            <Separator />
            <FieldGroup className="grid gap-4 sm:grid-cols-3">
              <Controller
                name="sku"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sku">
                      SKU <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sku"
                      placeholder="e.g. WH-1000XM5"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="barcode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="barcode">
                      Barcode (UPC / EAN)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="barcode"
                      placeholder="e.g. 4548736130258"
                    />
                  </Field>
                )}
              />

              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="stock">
                      Quantity in Stock{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="stock"
                      type="number"
                      min={0}
                      step="1"
                      placeholder="0"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Controller
              name="lowStockThreshold"
              control={form.control}
              render={({ field }) => (
                <Field className="max-w-[220px]">
                  <FieldLabel htmlFor="lowStockThreshold">
                    Low Stock Alert Threshold
                    <FieldHint>
                      You will be notified when stock drops below this number.
                    </FieldHint>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="lowStockThreshold"
                    type="number"
                    min={0}
                    step="1"
                    placeholder="e.g. 5"
                  />
                </Field>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
