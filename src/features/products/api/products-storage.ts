import type { CreateProductInput, Product } from "@/features/products/types"

const PRODUCTS_STORAGE_KEY = "seller.products"

const seedProducts: Array<Product> = [
  {
    id: "p-1001",
    name: "Cotton Hoodie",
    sku: "HD-CO-001",
    category: "Apparel",
    price: 49.99,
    stock: 38,
    status: "active",
    description: "Soft fleece hoodie with relaxed fit.",
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "p-1002",
    name: "Canvas Tote Bag",
    sku: "TB-CV-013",
    category: "Accessories",
    price: 24,
    stock: 72,
    status: "active",
    description: "Daily tote with reinforced handles.",
    createdAt: "2026-01-22T10:30:00.000Z",
  },
  {
    id: "p-1003",
    name: "Wireless Desk Lamp",
    sku: "LP-WS-020",
    category: "Home",
    price: 89.5,
    stock: 12,
    status: "draft",
    description: "Rechargeable lamp with warm and cool modes.",
    createdAt: "2026-02-04T14:10:00.000Z",
  },
]

function safeReadProductsFromStorage() {
  if (typeof window === "undefined") {
    return seedProducts
  }

  const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(
      PRODUCTS_STORAGE_KEY,
      JSON.stringify(seedProducts)
    )
    return seedProducts
  }

  try {
    const parsed = JSON.parse(raw) as Array<Product>
    if (!Array.isArray(parsed)) {
      window.localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify(seedProducts)
      )
      return seedProducts
    }
    return parsed
  } catch {
    window.localStorage.setItem(
      PRODUCTS_STORAGE_KEY,
      JSON.stringify(seedProducts)
    )
    return seedProducts
  }
}

export function getProducts() {
  return safeReadProductsFromStorage().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function createProduct(input: CreateProductInput) {
  const existing = safeReadProductsFromStorage()

  const product: Product = {
    id: `p-${crypto.randomUUID().split("-")[0]}`,
    ...input,
    description: input.description?.trim() || undefined,
    createdAt: new Date().toISOString(),
  }

  const nextProducts = [product, ...existing]

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      PRODUCTS_STORAGE_KEY,
      JSON.stringify(nextProducts)
    )
  }

  return product
}
