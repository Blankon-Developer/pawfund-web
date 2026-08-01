import { ApiValidationErrorType } from "@/types/api.types"
import { ExternalToast, toast } from "sonner"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message)
    this.name = "ApiError"
  }

  showToast(
    { title, description, ...options }: { title?: string } & ExternalToast = {
      title: this.message,
      description: `${this.status}: ${this.code}`,
    }
  ): void {
    if (typeof window !== "undefined") {
      toast.error(title, { description, ...options })
    }
  }
}

export class ApiValidationError extends ApiError {
  constructor(
    message: string,
    status: number,
    code: string,
    public errors: ApiValidationErrorType["errors"]
  ) {
    super(message, status, code)
    this.name = "ValidationError"
  }
}
