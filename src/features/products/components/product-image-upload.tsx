import * as React from "react"
import { Upload, X, GripVertical, Star, ImageIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionIcon } from "@/features/products/components/section-icon"
import type { ProductImage } from "@/features/products/types"

type ProductImageUploadProps = {
  images: ProductImage[]
  onImagesChange: (images: ProductImage[]) => void
}

let _imageId = 0
function nextImageId() {
  return `img-${Date.now()}-${++_imageId}`
}

export function ProductImageUpload({
  images,
  onImagesChange,
}: Readonly<ProductImageUploadProps>) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const dragItemRef = React.useRef<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  /* ── upload ── */

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files) return

    const newImages: ProductImage[] = Array.from(files).map((file, idx) => ({
      id: nextImageId(),
      file,
      url: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, ""),
      isPrimary: images.length === 0 && idx === 0,
    }))

    onImagesChange([...images, ...newImages])
    event.target.value = ""
  }

  function handleDropZone(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files
    if (!files.length) return

    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    )
    if (!imageFiles.length) return

    const newImages: ProductImage[] = imageFiles.map((file, idx) => ({
      id: nextImageId(),
      file,
      url: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, ""),
      isPrimary: images.length === 0 && idx === 0,
    }))

    onImagesChange([...images, ...newImages])
  }

  /* ── remove / set primary ── */

  function removeImage(id: string) {
    const updated = images.filter((img) => img.id !== id)
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true
    }
    onImagesChange(updated)
  }

  function setPrimaryImage(id: string) {
    onImagesChange(images.map((img) => ({ ...img, isPrimary: img.id === id })))
  }

  function updateImageAlt(id: string, alt: string) {
    onImagesChange(images.map((img) => (img.id === id ? { ...img, alt } : img)))
  }

  /* ── drag reorder ── */

  function handleDragStart(index: number) {
    dragItemRef.current = index
  }

  function handleDragOver(event: React.DragEvent, index: number) {
    event.preventDefault()
    setDragOverIndex(index)
  }

  function handleDrop(index: number) {
    const from = dragItemRef.current
    if (from === null || from === index) {
      setDragOverIndex(null)
      return
    }
    const reordered = [...images]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(index, 0, moved)
    onImagesChange(reordered)
    setDragOverIndex(null)
    dragItemRef.current = null
  }

  function handleDragEnd() {
    setDragOverIndex(null)
    dragItemRef.current = null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon icon={ImageIcon} />
          <div>
            <CardTitle>Media</CardTitle>
            <CardDescription>
              Upload high-quality images. The first image is your primary
              thumbnail.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* drop zone */}
        <button
          type="button"
          className="group relative flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={handleDropZone}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Upload className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Click to upload or drag &amp; drop
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, WEBP up to 5MB each · Max 10 images
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </button>

        {/* image grid */}
        {images.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              {images.length} image{images.length !== 1 && "s"} — drag to
              reorder · click star to set as primary
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`group/img relative overflow-hidden rounded-lg border bg-muted/30 transition-all ${
                    dragOverIndex === index
                      ? "scale-[1.02] border-primary ring-2 ring-primary/30"
                      : "hover:border-muted-foreground/40"
                  } ${image.isPrimary ? "ring-2 ring-primary" : ""}`}
                >
                  {image.isPrimary && (
                    <div className="absolute top-1.5 left-1.5 z-10">
                      <Badge
                        variant="default"
                        className="text-[10px] shadow-md"
                      >
                        Primary
                      </Badge>
                    </div>
                  )}

                  <button
                    type="button"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setPrimaryImage(image.id)}
                    className="block w-full"
                    aria-label={`Set image ${index + 1} as primary`}
                  >
                    <div className="aspect-square">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>

                  {/* overlay actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover/img:opacity-100">
                    <button
                      type="button"
                      className="flex size-7 items-center justify-center rounded-md bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white"
                      onClick={() => setPrimaryImage(image.id)}
                      title="Set as primary"
                    >
                      <Star
                        className={`size-3.5 ${image.isPrimary ? "fill-amber-500 text-amber-500" : ""}`}
                      />
                    </button>
                    <button
                      type="button"
                      className="flex size-7 items-center justify-center rounded-md bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeImage(image.id)}
                      title="Remove image"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {/* drag handle */}
                  <div className="absolute top-1.5 right-1.5 opacity-0 transition-opacity group-hover/img:opacity-100">
                    <div className="flex size-6 items-center justify-center rounded bg-black/40 text-white">
                      <GripVertical className="size-3.5" />
                    </div>
                  </div>

                  {/* alt text */}
                  <div className="border-t px-2 py-1.5">
                    <input
                      type="text"
                      value={image.alt}
                      onChange={(e) => updateImageAlt(image.id, e.target.value)}
                      placeholder="Alt text..."
                      className="w-full bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
