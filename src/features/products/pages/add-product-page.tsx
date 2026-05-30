import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm, useWatch, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProductGeneralInfoCard } from "@/features/products/components/product-general-info-card"
import { ProductImageUpload } from "@/features/products/components/product-image-upload"
import { ProductPricingCard } from "@/features/products/components/product-pricing-card"
import { ProductShippingCard } from "@/features/products/components/product-shipping-card"
import { ProductVariantsCard } from "@/features/products/components/product-variants-card"
import { ProductSeoCard } from "@/features/products/components/product-seo-card"
import {
  ProductStatusCard,
  ProductOrganizationCard,
  ProductFlagsCard,
  ProductSummaryCard,
} from "@/features/products/components/product-sidebar"
import {
  productFormSchema,
  type ProductFormValues,
} from "@/features/products/product-schema"
import { ProductInventoryCard } from "../components/product-inventory-card"
import { useCreateProductMutation } from "../api/products-api"

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "")
}

export function AddProductPage() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      sku: "",
      barcode: "",
      category: "",
      brand: "",
      status: "DRAFT",
      tags: [],
      images: [],
      price: "",
      compareAtPrice: 0,
      costPerItem: 0,
      stock: 0,
      lowStockThreshold: 0,
      trackInventory: true,
      requiresShipping: true,
      weight: "",
      weightUnit: "KG",
      length: 0,
      width: 0,
      height: 0,
      dimensionUnit: "CM",
      variantOptions: [],
      seoTitle: "",
      seoDescription: "",
      seoSlug: "",
      isFeatured: false,
      isDigital: false,
      storeId: "",
    },
  })

  const [tagInput, setTagInput] = React.useState("")
  const [createProduct, { isLoading, isError, isSuccess, error }] =
    useCreateProductMutation()

  /* auto-generate slug from name */
  const name = useWatch({ control: form.control, name: "name" })
  React.useEffect(() => {
    const currentSlug = form.getValues("seoSlug")
    if (!currentSlug || currentSlug === generateSlug(name.slice(0, -1))) {
      form.setValue("seoSlug", generateSlug(name), { shouldDirty: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  const images = useWatch({ control: form.control, name: "images" })
  const variantOptions = useWatch({
    control: form.control,
    name: "variantOptions",
  })

  const submitProduct = (status: ProductFormValues["status"]) => {
    form.setValue("status", status, { shouldDirty: true })

    void form.handleSubmit((data) => {
      void onSubmit({ ...data, status })
    })()
  }

  //Function to create a form Data
  function newFormData(data: ProductFormValues) {
    const formData = new FormData()

    Object.entries(data).forEach(([key, val]) => {
      if (typeof val === "string") {
        formData.append(key, val)
      } else if (typeof val === "number") {
        formData.append(key, String(val))
      } else if (typeof val === "boolean") {
        formData.append(key, String(val))
      } else if (Array.isArray(val)) {
        if (key === "images") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          val.forEach((image: any) => {
            const actualFile = image.file || image

            if (
              actualFile &&
              (actualFile instanceof File || actualFile.size > 0)
            ) {
              formData.append("images", actualFile)
            }
          })
        } else {
          val.forEach((item) => {
            formData.append(key, String(item))
          })
        }
      } else if (typeof val === "object") {
        formData.append(key, JSON.stringify(val))
      }
    })

    return formData
  }

  async function onSubmit(data: ProductFormValues) {
    // const productFormData = toFormData({ ...data, storeId: activeStoreId })

    const newObj = newFormData({
      ...data,
      storeId: localStorage.getItem("activeStoreId")!,
    })

    const uploadedFiles = newObj.getAll("images")
    console.log(uploadedFiles)

    console.log(newObj, "formData")

    await createProduct(newObj)
  }

  return (
    <form
      id="add-product-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 pb-12"
    >
      {/* ── header ── */}
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="w-fit">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </Button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create New Product
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details below to add a new product to your store.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" asChild>
              <Link to="/products">Discard</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => submitProduct("DRAFT")}
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={() => submitProduct("ACTIVE")}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  Saving
                  <Loader2 className="animate-spin" />
                </span>
              ) : (
                "Publish Product"
              )}
            </Button>
          </div>
        </div>
      </div>

      {(isSuccess || isError) && (
        <Alert variant={isError ? "destructive" : "default"}>
          <AlertTitle>
            {isError ? "Product publish failed" : "Product saved"}
          </AlertTitle>
          <AlertDescription>
            {isError
              ? error && "data" in error && typeof error.data === "string"
                ? error.data
                : "Something went wrong while saving the product."
              : "The product was saved successfully."}
          </AlertDescription>
        </Alert>
      )}

      {/* ── two-column layout ── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* left column */}
        <div className="space-y-6">
          <ProductGeneralInfoCard form={form} />

          <ProductImageUpload
            images={images}
            onImagesChange={(imgs) => form.setValue("images", imgs)}
          />

          <ProductPricingCard form={form} />
          <ProductInventoryCard form={form} />
          <ProductShippingCard form={form} />

          <ProductVariantsCard
            variantOptions={variantOptions}
            onVariantOptionsChange={(opts) =>
              form.setValue("variantOptions", opts)
            }
          />

          <ProductSeoCard form={form} />
        </div>

        {/* right column */}
        <div className="space-y-6">
          <ProductStatusCard form={form} />
          <ProductOrganizationCard
            form={form}
            tagInput={tagInput}
            onTagInputChange={setTagInput}
          />
          <ProductFlagsCard form={form} />
          <ProductSummaryCard form={form} />
        </div>
      </div>

      {/* ── sticky bottom bar ── */}
      <div className="sticky bottom-0 z-20 -mx-1 rounded-xl border bg-background/95 px-6 py-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="hidden text-sm text-muted-foreground sm:block">
            All fields marked with <span className="text-destructive">*</span>{" "}
            are required.
          </p>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <Button type="button" variant="ghost" asChild>
              <Link to="/products">Cancel</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => submitProduct("DRAFT")}
              disabled={isLoading}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={() => submitProduct("ACTIVE")}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  Saving
                  <Loader2 className="animate-spin" />
                </span>
              ) : (
                "Publish Product"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
