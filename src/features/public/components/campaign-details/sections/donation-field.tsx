"use client"

import { USDCIcon } from "@/assets/icons/usdc"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import { Field, FieldDescription, FieldError } from "@/shadcn-ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn-ui/input-group"
import { Label } from "@/shadcn-ui/label"
import { Progress } from "@/shadcn-ui/progress"
import { cn } from "@/utils"
import { timeRemaining } from "@/utils/format-date"
import { Calendar, Goal, HandHeart, Heart, Share } from "lucide-react"
import numeral from "numeral"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

type DonationFieldProps = {
  goalAmount: number
  donorCount: number
  endAt: string
  raisedAmount: number
  contractAddress: string
  disabled?: boolean
}

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Enter the donation amount you wish to give.")
    .refine((v) => {
      return parseFloat(v) > 0
    }, "Donation cannot be 0"),
})

export function DonationField({
  donorCount,
  endAt,
  goalAmount,
  raisedAmount,
  disabled,
}: DonationFieldProps) {
  const form = useHookForm({
    disabled,
    schema: formSchema,
    defaultValues: {
      amount: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast.success("Succes Donate")
    form.reset()
  }

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void
  ) => {
    const value = e.target.value
    // Only allow numbers, one decimal point, and only one zero before decimal
    const regex = /^0(\.\d*)?$|^[1-9]\d*(\.\d*)?$|^$/
    if (regex.test(value)) {
      callback(value)
    }
  }

  const goal = `${numeral(goalAmount)
    .format(goalAmount >= 10_000 ? "0.0a" : "0,0")
    .toUpperCase()} USDC Goal`

  const donations = `${numeral(donorCount)
    .format(donorCount >= 1_000 ? "0.0a" : "0")
    .toUpperCase()} Donations`

  const remaining = timeRemaining(endAt)

  const raised = `${numeral(raisedAmount)
    .format(raisedAmount >= 10_000 ? "0.0a" : "0,0")
    .toUpperCase()} USDC Raised`

  const progress = raisedAmount / goalAmount

  return (
    <div className="sticky top-18 w-full rounded-3xl bg-card p-6">
      <div className="flex items-center gap-2">
        <USDCIcon className={`size-5.5 p-0 text-blue-500 dark:text-blue-600`} />
        <p className="text-xl font-medium">{raised}</p>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <Progress
          className="h-2.5 bg-gray-200 dark:bg-neutral-800"
          value={progress * 100}
          indicatorClassName="bg-green-500 dark:bg-green-600 rounded-full"
        />
        <p className="font-medium">{numeral(progress).format("0%")}</p>
      </div>
      <div className="mt-2 flex gap-4">
        <div className="flex items-center gap-1.5">
          <Goal size={14} />
          <p className="text-sm font-medium text-nowrap">{goal}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Heart size={14} />
          <p className="text-sm font-medium text-nowrap">{donations}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={13} />
          <p className="text-sm font-medium text-nowrap">{remaining}</p>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="input-donation" className="text-base font-medium">
          Enter your donation
        </Label>
        <FieldDescription className="">
          There is no minimum donation amount.
        </FieldDescription>

        <form id="donate-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <>
                <Field className="mt-1.5" data-invalid={fieldState.invalid}>
                  <InputGroup className="h-12 gap-0.5 rounded-full border-border bg-transparent px-1 shadow-none">
                    <InputGroupAddon align={"inline-start"}>
                      <USDCIcon className="size-5 opacity-60 dark:text-secondary" />
                    </InputGroupAddon>
                    <InputGroupInput
                      aria-invalid={fieldState.invalid}
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => handleAmountChange(e, field.onChange)}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <ButtonSelectAmount
                    disabled={disabled}
                    amount="25"
                    selected={field.value == "25"}
                    onSelected={(amount) =>
                      form.setValue("amount", amount, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <ButtonSelectAmount
                    disabled={disabled}
                    amount="50"
                    selected={field.value == "50"}
                    onSelected={(amount) =>
                      form.setValue("amount", amount, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <ButtonSelectAmount
                    disabled={disabled}
                    amount="100"
                    selected={field.value == "100"}
                    onSelected={(amount) =>
                      form.setValue("amount", amount, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <ButtonSelectAmount
                    disabled={disabled}
                    amount="200"
                    selected={field.value == "200"}
                    onSelected={(amount) =>
                      form.setValue("amount", amount, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              </>
            )}
          />
        </form>
      </div>
      <Button
        size={"lg"}
        className="mt-4 h-12 w-full"
        type="submit"
        form="donate-form"
        disabled={disabled}
      >
        <HandHeart />
        Donate
      </Button>
      <Button
        variant={"secondary"}
        size={"lg"}
        className="mt-2 h-12 w-full bg-gray-300/60 dark:bg-secondary"
        disabled={disabled}
      >
        <Share />
        Share
      </Button>
    </div>
  )
}

export function ButtonSelectAmount(
  props: {
    amount: string
    selected?: boolean
    onSelected?: (amount: string) => void
    disabled?: boolean
  } & React.HTMLAttributes<HTMLButtonElement>
) {
  const { amount, selected, onSelected, ...restProps } = props
  return (
    <Button
      tabIndex={-1}
      variant={"outline"}
      className={cn(
        "w-full border-border! bg-transparent px-4 shadow-none hover:bg-gray-200/50",
        selected && "ring-2 ring-border"
      )}
      onClick={() => onSelected?.(amount)}
      {...restProps}
    >
      {amount} USDC
    </Button>
  )
}
