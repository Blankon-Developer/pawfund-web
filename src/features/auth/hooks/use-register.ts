import { MutationConfig, queryClient } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"
import { register } from "../api/register"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import { useGetAuthMe } from "./use-get-auth-me"

// upload image

function useUploadRegisterImage(
  mutationConfig: MutationConfig<typeof register.uploadImage> = {}
) {
  return useMutation({
    mutationFn: register.uploadImage,
    ...mutationConfig,
  })
}

// Supporter
function useSupporterRegister(
  mutationConfig: MutationConfig<typeof register.supporter> = {}
) {
  return useMutation({
    mutationFn: (params) => register.supporter(params),
    ...mutationConfig,
    onSuccess: (data, ...params) => {
      const currentSession = useSiweSessionStore.getState().session
      if (currentSession)
        useSiweSessionStore.getState().addSession({
          address: currentSession.address,
          chainId: currentSession.chainId,
          jwt: currentSession.jwt,
          user: {
            name: data.name,
            role: data.role,
            imageUrl: data.imageUrl || null,
            isNotRegistered: false,
          },
        })
      queryClient.invalidateQueries({
        queryKey: useGetAuthMe.getQueryOptions().queryKey,
      })
      mutationConfig.onSuccess?.(data, ...params)
    },
  })
}

// Fundraiser
function useFundraiserRegister(
  mutationConfig: MutationConfig<typeof register.fundraiser> = {}
) {
  return useMutation({
    mutationFn: (params) => register.fundraiser(params),
    ...mutationConfig,
    onSuccess: (data, ...params) => {
      const currentSession = useSiweSessionStore.getState().session
      if (currentSession)
        useSiweSessionStore.getState().addSession({
          address: currentSession.address,
          chainId: currentSession.chainId,
          jwt: currentSession.jwt,
          user: {
            name: data.name,
            role: data.role,
            imageUrl: data.imageUrl || null,
            isNotRegistered: false,
          },
        })
      queryClient.invalidateQueries({
        queryKey: useGetAuthMe.getQueryOptions().queryKey,
      })
      mutationConfig.onSuccess?.(data, ...params)
    },
  })
}

export { useFundraiserRegister, useSupporterRegister, useUploadRegisterImage }
