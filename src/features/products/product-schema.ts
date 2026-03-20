import { z } from "zod/v4"

/* ─── image sub-schema (kept simple — files validated on upload) ─── */

export const productImageSchema = z.object({
  id: z.string(),
  file: z.instanceof(File).optional(),
  url: z.string(),
  alt: z.string(),
  isPrimary: z.boolean(),
})

/* ─── variant option sub-schema ─── */

export const productVariantOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(z.string()),
})

/* ─── main product form schema ─── */

export const productFormSchema = z
  .object({
    /* general */
    name: z
      .string()
      .min(1, "Product name is required")
      .max(120, "Name must be 120 characters or fewer"),
    shortDescription: z
      .string()
      .max(160, "Short description must be 160 characters or fewer"),
    description: z.string(),

    /* identifiers */
    sku: z.string(),
    barcode: z.string(),

    /* organization */
    category: z.string().min(1, "Category is required"),
    brand: z.string(),
    tags: z.array(z.string()),

    /* status */
    status: z.enum(["active", "draft", "archived"]),

    /* media */
    images: z.array(productImageSchema),

    /* pricing */
    price: z
      .string()
      .min(1, "Price is required")
      .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number",
      }),
    compareAtPrice: z.string(),
    costPerItem: z.string(),

    /* inventory */
    stock: z.string(),
    lowStockThreshold: z.string(),
    trackInventory: z.boolean(),

    /* shipping */
    requiresShipping: z.boolean(),
    weight: z.string(),
    weightUnit: z.enum(["kg", "g", "lb", "oz"]),
    length: z.string(),
    width: z.string(),
    height: z.string(),
    dimensionUnit: z.enum(["cm", "in"]),

    /* variants */
    variantOptions: z.array(productVariantOptionSchema),

    /* seo */
    seoTitle: z.string().max(70, "SEO title must be 70 characters or fewer"),
    seoDescription: z
      .string()
      .max(160, "Meta description must be 160 characters or fewer"),
    seoSlug: z.string(),

    /* flags */
    isFeatured: z.boolean(),
    isDigital: z.boolean(),
  })
  .refine(
    (data) => {
      /* if tracking inventory, SKU and stock are required */
      if (data.trackInventory) {
        return data.sku.length > 0
      }
      return true
    },
    { message: "SKU is required when tracking inventory", path: ["sku"] }
  )
  .refine(
    (data) => {
      if (data.trackInventory) {
        return data.stock.length > 0 && !Number.isNaN(Number(data.stock))
      }
      return true
    },
    {
      message: "Stock quantity is required when tracking inventory",
      path: ["stock"],
    }
  )

export type ProductFormValues = z.infer<typeof productFormSchema>
