"use client"

import { USDCIcon } from "@/assets/icons/usdc"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn-ui/dialog"
import { Field, FieldError } from "@/shadcn-ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn-ui/input-group"
import { HandHeart } from "lucide-react"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ButtonSelectAmount } from "./donation-field"

type InputDonationDialogProps = {
  triggerButton?: React.ReactNode
}
const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Enter the donation amount you wish to give.")
    .refine((v) => {
      return parseFloat(v) > 0
    }, "Donation cannot be 0"),
})

function DonationDialog(props: InputDonationDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useHookForm({
    schema: formSchema,
    defaultValues: {
      amount: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast.success("Succes Donate")
    form.reset()
    setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {props.triggerButton && (
        <DialogTrigger asChild>{props.triggerButton}</DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donation Amount</DialogTitle>
          <DialogDescription>
            There is no minimum donation amount.
          </DialogDescription>
        </DialogHeader>
        <form
          id="donate-form-dialog"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Controller
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <>
                <div className="grid grid-cols-4 gap-2">
                  <ButtonSelectAmount
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
                <Field className="mt-3" data-invalid={fieldState.invalid}>
                  <InputGroup className="h-12 gap-0.5 rounded-full bg-transparent px-1 shadow-none">
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
              </>
            )}
          />
        </form>
        <DialogFooter>
          <Button type="submit" form="donate-form-dialog">
            <HandHeart />
            Send Donation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DonationDialogTrigger({
  children = "Donate",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <DonationDialog triggerButton={<Button {...props}>{children}</Button>} />
  )
}

export { DonationDialog, DonationDialogTrigger }
