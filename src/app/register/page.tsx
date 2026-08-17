"use client"

import Image from "next/image"

import { MainContainer } from "@/components/main-container"
import {
  FundraiserRegisterForm,
  FundraiserRegisterPreview,
  RegisterStepper,
  RoleSelectionForm,
  SupporterRegisterForm,
  SupporterRegisterPreview,
  useRegistrationStore,
} from "@/features/auth"
import { Tabs, TabsContent } from "@/shadcn-ui/tabs"
import { cn } from "@/utils"

export default function RegisterPage() {
  const step = useRegistrationStore((state) => state.step)
  const setStep = useRegistrationStore((state) => state.setStep)
  const selectedRole = useRegistrationStore((state) => state.selectedRole)

  return (
    <MainContainer className="flex min-h-svh max-w-4xl flex-col items-center py-8">
      <div className="flex w-full flex-col items-center">
        <Image
          src={"/pawfund-text-logo.svg"}
          alt="Pawfund Logo"
          width={146}
          height={35}
        />
        <RegisterStepper step={step} onStepClick={setStep} className="mt-12" />
      </div>
      <Tabs
        defaultValue="1"
        value={step.toString()}
        className="mt-10 w-full grow"
      >
        <TabsContent
          forceMount
          value="1"
          className={cn("flex flex-col", step !== 1 && "hidden")}
        >
          <RoleSelectionForm className="flex-1" />
        </TabsContent>
        <TabsContent
          forceMount
          value="2"
          className={cn("flex flex-col", step !== 2 && "hidden")}
        >
          {selectedRole === "FUNDRAISER" && (
            <FundraiserRegisterForm
              className="flex-1"
              onPrevious={() => setStep(1)}
            />
          )}
          {selectedRole === "SUPPORTER" && (
            <SupporterRegisterForm
              className="flex-1"
              onPrevious={() => setStep(1)}
            />
          )}
        </TabsContent>
        <TabsContent
          forceMount
          value="3"
          className={cn("flex flex-col", step !== 3 && "hidden")}
        >
          {selectedRole === "FUNDRAISER" && (
            <FundraiserRegisterPreview
              className="flex-1"
              onPrevious={() => setStep(2)}
            />
          )}
          {selectedRole === "SUPPORTER" && (
            <SupporterRegisterPreview
              className="flex-1"
              onPrevious={() => setStep(2)}
            />
          )}
        </TabsContent>
      </Tabs>
    </MainContainer>
  )
}
