import { MutationConfig, queryClient } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"
import { editAccount } from "../api/edit-account"
import {
  useGetFundraiserAccount,
  useGetSupporterAccount,
} from "./use-get-account"
import { useAccountFormStore } from "../stores/form.store"

function useEditFundraiserAccount(
  mutationConfig: MutationConfig<typeof editAccount.fundraiser> = {}
) {
  return useMutation({
    mutationFn: (params) => editAccount.fundraiser(params),
    ...mutationConfig,
    onMutate: (...args) => {
      useAccountFormStore.getState().setIsSubmitting(true)
      mutationConfig.onMutate?.(...args)
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: useGetFundraiserAccount.queryOptions().queryKey,
      })
      mutationConfig.onSuccess?.(...args)
    },
    onSettled: (...args) => {
      useAccountFormStore.getState().setIsSubmitting(false)
      mutationConfig.onSettled?.(...args)
    },
  })
}

function useEditSupporterAccount(
  mutationConfig: MutationConfig<typeof editAccount.supporter> = {}
) {
  return useMutation({
    mutationFn: (params) => editAccount.supporter(params),
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: useGetSupporterAccount.queryOptions().queryKey,
      })
      mutationConfig.onSuccess?.(...args)
    },
  })
}

export { useEditFundraiserAccount, useEditSupporterAccount }
