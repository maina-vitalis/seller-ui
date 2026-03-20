import { Link } from "react-router-dom"
import { DollarSign } from "lucide-react"
import { Controller, useWatch } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { SectionIcon } from "@/features/products/components/section-icon"
import { FieldHint } from "@/features/products/components/field-hint"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"

type ProductPricingCardProps = {
  form: UseFormReturn<ProductFormValues>
}

function ProfitMarginIndicator({
  price,
  cost,
}: Readonly<{ price: string; cost: string }>) {
  const p = Number(price)
  const c = Number(cost)
  if (!p || !c || p <= 0 || c <= 0) return null

  const margin = ((p - c) / p) * 100
  const profit = p - c
  let color = "text-red-500 dark:text-red-400"
  if (margin >= 50) color = "text-emerald-600 dark:text-emerald-400"
  else if (margin >= 20) color = "text-amber-600 dark:text-amber-400"

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-dashed px-3 py-2 text-xs ${color}`}
    >
      <span className="font-semibold">{margin.toFixed(1)}% margin</span>
      <Separator orientation="vertical" className="h-3" />
      <span>${profit.toFixed(2)} profit per unit</span>
    </div>
  )
}

export function ProductPricingCard({ form }: Readonly<ProductPricingCardProps>) {
  const price = useWatch({ control: form.control, name: "price" })
  const costPerItem = useWatch({ control: form.control, name: "costPerItem" })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={DollarSign} />
          <div>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>
              Set the selling price, compare-at price, and cost.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <FieldGroup className="grid gap-4 sm:grid-cols-3">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">
                  Price <span className="text-destructive">*</span>
                  <FieldHint>The price customers will pay at checkout.</FieldHint>
                </FieldLabel>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    aria-invalid={fieldState.invalid}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="compareAtPrice"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="compareAtPrice">
                  Compare-at Price
                  <FieldHint>The original price to show as crossed out (for sales).</FieldHint>
                </FieldLabel>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    {...field}
                    id="compareAtPrice"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </Field>
            )}
          />

          <Controller
            name="costPerItem"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="costPerItem">
                  Cost per Item
                  <FieldHint>
                    Your cost/COGS. Used to calculate profit margin. Not shown to customers.
                  </FieldHint>
                </FieldLabel>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    {...field}
                    id="costPerItem"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <ProfitMarginIndicator price={price} cost={costPerItem} />

        {Number(price) > 0 && (
          <p className="text-xs text-muted-foreground">
            Tax settings are applied at the store level. Configure them in{" "}
            <Link
              to="/settings"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Settings → Tax
            </Link>
            .
          </p>
        )}
      </CardContent>
    </Card>
  )
}
