"use client"

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/file-upload"
import { Alert, AlertDescription, AlertTitle } from "@/shadcn-ui/alert"

import { cn } from "@/utils"
import { CircleAlertIcon, UserRoundIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./shadcn-ui/button"

interface AvatarInputProps {
  maxSize?: number
  className?: string
  onFileChange?: (file: FileWithPreview | null) => void
  defaultAvatar?: string
  value?: FileWithPreview
  showErrorAlert?: boolean
  label?: string | React.ReactNode
  onError?: (errors: string[]) => void
  "aria-invalid"?: boolean
  hideInstruction?: boolean
}

export function AvatarInput({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  value,
  showErrorAlert = true,
  onError,
  label,
  "aria-invalid": ariaInvalid,
  hideInstruction,
}: AvatarInputProps) {
  const [
    { files, isDragging, errors },
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
    accept: "image/jpeg, image/png, image/webp",
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
    <div className={cn("relative flex flex-col items-center gap-2", className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <div
          className={cn(
            "group/avatar relative size-25 cursor-pointer overflow-hidden rounded-full border border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50",
            ariaInvalid &&
              "border-destructive/50 bg-destructive/5 hover:border-destructive/70",
            isDragging && "border-primary bg-primary/5 hover:border-primary",
            previewUrl && "border-solid"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
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
            <div className="flex h-full w-full flex-col items-center justify-center">
              <UserRoundIcon className="size-7 fill-muted-foreground/10 text-muted-foreground" />
            </div>
          )}
        </div>
        {/* Remove Button - only show when file is uploaded */}
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="absolute inset-e-0.5 top-0.5 z-10 size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700"
            aria-label="Remove avatar"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions */}
      {!hideInstruction && (
        <div className="flex flex-col gap-0.5 text-center">
          <span
            className={cn(
              "text-sm font-medium",
              ariaInvalid && "text-destructive"
            )}
          >
            {label || "Avatar"}
          </span>
          <span className="text-xs text-muted-foreground">
            PNG, JPG up to {formatBytes(maxSize)}
          </span>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && showErrorAlert && (
        <Alert variant="destructive" className="top-[calc(100%+1rem)] min-w-sm">
          <CircleAlertIcon />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
