export type ProductStatus = "active" | "draft" | "archived"

export type ProductImage = {
  id: string
  file?: File
  url: string
  alt: string
  isPrimary: boolean
}

export type ProductVariantOption = {
  id: string
  name: string
  values: string[]
}

export type ProductTag = string

export type Product = {
  id: string
  name: string
  sku: string
  barcode?: string
  category: string
  brand?: string
  tags: ProductTag[]
  price: number
  compareAtPrice?: number
  costPerItem?: number
  stock: number
  lowStockThreshold?: number
  trackInventory: boolean
  status: ProductStatus
  description?: string
  shortDescription?: string
  images: ProductImage[]
  weight?: number
  weightUnit: "kg" | "g" | "lb" | "oz"
  length?: number
  width?: number
  height?: number
  dimensionUnit: "cm" | "in"
  requiresShipping: boolean
  seoTitle?: string
  seoDescription?: string
  seoSlug?: string
  variantOptions: ProductVariantOption[]
  isFeatured: boolean
  isDigital: boolean
  createdAt: string
}

export type CreateProductInput = Omit<Product, "id" | "createdAt">
