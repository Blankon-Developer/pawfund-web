/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiBase = {
  code: string
  message: string
}

type Pagination = {
  current: number
  pageSize: number
  totalPages: number
  totalItems: number
}

export type ApiSuccessType<T = any | null> = ApiBase & {
  data?: T
  pagination?: Pagination
}

export type ApiErrorType = ApiBase

export type ApiValidationErrorType = ApiErrorType & {
  errors?: Record<string, string[]>
}

export type ApiResponseType<T = any> = ApiSuccessType<T> &
  ApiErrorType &
  ApiValidationErrorType
