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
    storeId: z.string(),

    /* organization */
    category: z.string().min(1, "Category is required"),
    brand: z.string(),
    tags: z.array(z.string()),

    /* status */
    status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),

    /* media */
    images: z.array(productImageSchema),

    /* pricing */
    price: z
      .string()
      .min(1, "Price is required")
      .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number",
      }),
    compareAtPrice: z.coerce.number("Compare price must be a number"),
    costPerItem: z.coerce.number("Cost per item must be a number"),

    /* inventory */
    stock: z.coerce.number().int(),
    lowStockThreshold: z.coerce.number(),
    trackInventory: z.preprocess(
      (val) => {
        if (typeof val === "string") {
          if (val.toLowerCase() === "false") return false
          if (val.toUpperCase() === "true") return true
        }
        return val
      },
      z.boolean({ message: "Must be a boolean or a 'true'/'false' string" })
    ),

    /* shipping */
    requiresShipping: z.preprocess(
      (val) => {
        if (typeof val === "string") {
          if (val.toLowerCase() === "false") return false
          if (val.toUpperCase() === "true") return true
        }
        return val
      },
      z.boolean({ message: "Must be a boolean or a 'true'/'false' string" })
    ),
    weight: z.string(),
    weightUnit: z.enum(["KG", "G", "LB", "OZ"]),
    length: z.coerce.number("Please enter a valid number"),
    width: z.coerce.number("Please enter a valid number"),
    height: z.coerce.number("Please enter a valid number"),
    dimensionUnit: z.enum(["CM", "IN"]),

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
        return data.stock > 0 && !Number.isNaN(Number(data.stock))
      }
      return true
    },
    {
      message: "Stock quantity is required when tracking inventory",
      path: ["stock"],
    }
  )

export type ProductFormInput = z.input<typeof productFormSchema>
export type ProductFormValues = z.output<typeof productFormSchema>
export type ProductType = z.infer<typeof productFormSchema>
