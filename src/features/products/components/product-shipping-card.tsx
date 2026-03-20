import { Truck } from "lucide-react"
import { Controller, useWatch } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { SectionIcon } from "@/features/products/components/section-icon"
import type { UseFormReturn } from "react-hook-form"
import type { ProductFormValues } from "@/features/products/product-schema"

type Props = { form: UseFormReturn<ProductFormValues> }

export function ProductShippingCard({ form }: Props) {
  const requiresShipping = useWatch({ control: form.control, name: "requiresShipping" })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={Truck} />
          <div>
            <CardTitle>Shipping</CardTitle>
            <CardDescription>
              Physical dimensions and weight for shipping calculations.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Controller
          name="requiresShipping"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <div>
                <FieldLabel htmlFor="requiresShipping" className="text-sm">
                  This is a physical product
                </FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Requires shipping to a customer address.
                </p>
              </div>
              <Switch
                id="requiresShipping"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />

        {requiresShipping && (
          <>
            <Separator />
            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="weight">Weight</FieldLabel>
                    <Input
                      {...field}
                      id="weight"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                    />
                  </Field>
                )}
              />

              <Controller
                name="weightUnit"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="weightUnit">Unit</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="weightUnit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                        <SelectItem value="oz">Ounces (oz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <FieldLabel className="text-sm">Dimensions (L × W × H)</FieldLabel>
                <Controller
                  name="dimensionUnit"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-7 w-20 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Controller
                  name="length"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} type="number" min={0} step="0.1" placeholder="Length" />
                  )}
                />
                <Controller
                  name="width"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} type="number" min={0} step="0.1" placeholder="Width" />
                  )}
                />
                <Controller
                  name="height"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} type="number" min={0} step="0.1" placeholder="Height" />
                  )}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
