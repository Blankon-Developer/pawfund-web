/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutationOptions,
  DefaultOptions,
  QueryClient,
} from "@tanstack/react-query"

export const queryConfig = {
  queries: {
    throwOnError: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  },
} satisfies DefaultOptions

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})

export const authedQueryKey = (keys?: unknown[]) => (keys ? ["authed", ...keys] : ["authed"])
export const publicQueryKey = (keys?: unknown[]) => (keys ? ["public", ...keys] : ["public"])

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>
