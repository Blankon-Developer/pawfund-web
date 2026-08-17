/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import { z } from "zod"

/**
 * Hook for managing search parameters with Zod schema validation
 * @param schema Optional Zod schema for validation
 * @returns Object containing the current search parameter state and update functions
 * @example
 * const { state, set, setMany, remove } = useSearchParameters(z.object({ name: z.string(), age: z.number().optional() }))
 */
export function useSearchParameters<
  TSchema extends z.ZodObject<{
    [key: string]: z.ZodCatch<any>
  }>,
>(schema?: TSchema) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = useMemo(() => {
    const raw = Object.fromEntries(searchParams.entries())

    return schema ? schema.parse(raw) : raw
  }, [schema, searchParams])

  const set = useCallback(
    (
      key: keyof z.infer<TSchema>,
      value: z.infer<TSchema>[typeof key] | undefined
    ) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === undefined || value === null || value === "") {
        params.delete(String(key))
      } else {
        params.set(String(key), String(value))
      }

      router.replace(`${pathname}?${params}` as Route)
    },
    [pathname, router, searchParams]
  )

  const setMany = useCallback(
    (values: Partial<z.infer<TSchema>>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(values)) {
        if (value === undefined || value === null || value === "") {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      }

      router.replace(`${pathname}?${params}` as Route)
    },
    [pathname, router, searchParams]
  )

  const remove = useCallback(
    <K extends keyof z.infer<TSchema>>(key: K) => {
      const params = new URLSearchParams(searchParams.toString())

      params.delete(String(key))

      router.replace(`${pathname}?${params}` as Route)
    },
    [pathname, router, searchParams]
  )

  return {
    state: value,
    set,
    setMany,
    remove,
  }
}
