"use client"

import { Activity, createContext, useContext, useState } from "react"
import { Tabs, TabsContent } from "./shadcn-ui/tabs"

type StepperContextValue = {
  currentStep: number
  next: () => void
  previous: () => void
}

const StepperContext = createContext<StepperContextValue | null>(null)

type StepperProps<S> = {
  defaultStep?: number
  steps?: S[]
  children?:
    | React.ReactNode
    | ((params: {
        step: S
        order: number
        next?: StepperContextValue["next"]
        previous?: StepperContextValue["previous"]
      }) => React.ReactNode)
} & Omit<React.ComponentProps<typeof Tabs>, "defaultValue" | "children">

function Stepper<S>({
  defaultStep,
  steps,
  children,
  ...props
}: StepperProps<S>) {
  const [currentStep, setCurrentStep] = useState<number>(defaultStep ?? 1)

  const next = () => {
    if (!!steps?.length && currentStep >= steps.length) return
    setCurrentStep((prev) => prev + 1)
  }

  const previous = () => {
    if (currentStep <= 1) return
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <StepperContext.Provider value={{ currentStep, next, previous }}>
      <Tabs defaultValue={currentStep.toString()} {...props}>
        {typeof children === "function"
          ? steps?.map((step, index) =>
              children({ step, order: index + 1, next, previous })
            )
          : children}
      </Tabs>
    </StepperContext.Provider>
  )
}
type StepperContentsProps = {
  step: number
  children?: React.ReactNode
  className?: string
}
function StepperContent({ step, className, children }: StepperContentsProps) {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error("<StepContent/> must use within <Step /> component")
  }
  const { currentStep } = context
  return (
    <Activity mode={step == currentStep ? "visible" : "hidden"}>
      <TabsContent forceMount value={step.toString()} className={className}>
        {children}
      </TabsContent>
    </Activity>
  )
}

function useStepperContext() {
  const context = useContext(StepperContext)

  if (!context) {
    throw new Error("useStepperContext must be used within <Stepper />")
  }

  return context
}

export { Stepper, StepperContent, useStepperContext }
