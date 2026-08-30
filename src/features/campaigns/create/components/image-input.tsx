"use client"

import { useFileUpload, type FileWithPreview } from "@/hooks/file-upload"
import { Button } from "@/shadcn-ui/button"

import { cn } from "@/utils"
import { ImagePlusIcon, RotateCcwIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { Activity } from "react"

interface AvatarInputProps {
  maxSize?: number
  className?: string
  onFileChange?: (file: FileWithPreview | null) => void
  defaultAvatar?: string
  value?: FileWithPreview
  onError?: (errors: string[]) => void
  "aria-invalid"?: boolean
}

function ImageInput({
  maxSize = 3 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  value,
  onError,
  "aria-invalid": ariaInvalid,
}: AvatarInputProps) {
  const [
    { files, isDragging },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
    onFilesChange: (files) => {
      onFileChange?.(files[0] || null)
    },
    onError: (errors) => {
      onError?.(errors)
    },
  })

  const currentFile = files[0]
  const previewUrl = value?.preview || currentFile?.preview

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id)
    }
  }

  return (
    <div
      className={cn(
        "relative flex max-w-2xl min-w-sm flex-col items-center gap-2",
        className
      )}
    >
      {/* Avatar Preview */}
      <div
        className={cn(
          "group/avatar relative aspect-video h-auto w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50",
          ariaInvalid &&
            "border-destructive/50 bg-destructive/5 hover:border-destructive/70",
          isDragging && "border-primary bg-primary/5 hover:border-primary",
          isDragging && currentFile && "ring-1 ring-primary",
          previewUrl && "border-solid"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !currentFile && openFileDialog()}
      >
        <input {...getInputProps()} className="sr-only" />

        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
            width={96}
            height={96}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/80">
            <ImagePlusIcon className="size-8 fill-muted-foreground/10" />
            <p>Drag or click here to upload campaign image</p>
          </div>
        )}
        <Activity mode={currentFile ? "visible" : "hidden"}>
          <div
            className={cn(
              "absolute inset-0 flex aspect-video h-full w-full items-end justify-end gap-2 bg-background/20 p-4 backdrop-blur-[4p]",
              "opacity-0 transition-opacity duration-200 ease-in-out group-hover/avatar:opacity-100"
            )}
          >
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={handleRemove}
              className="text-destructive hover:text-destructive"
            >
              <TrashIcon />
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={openFileDialog}
              className=""
            >
              <RotateCcwIcon />
              Change
            </Button>
          </div>
        </Activity>
      </div>
    </div>
  )
}

export { ImageInput }
