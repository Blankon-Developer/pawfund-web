"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/utils/index"

function Progress({
  className,
  indicatorClassName,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-3 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "size-full flex-1 bg-primary transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

function ProgressCircle({
  className,
  indicatorClassName,
  trackClassName,
  value = 0,
  size = 48,
  strokeWidth = 4,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Progress value from 0 to 100
   */
  value?: number
  /**
   * Size of the circle in pixels
   */
  size?: number
  /**
   * Width of the progress stroke
   */
  strokeWidth?: number
  /**
   * Additional className for the progress stroke
   */
  indicatorClassName?: string
  /**
   * Additional className for the progress track
   */
  trackClassName?: string
  /**
   * Content to display in the center of the circle
   */
  children?: React.ReactNode
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div
      data-slot="progress-circle"
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          data-slot="progress-circle-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={cn("text-secondary", trackClassName)}
        />
        <circle
          data-slot="progress-circle-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "text-primary transition-all duration-300 ease-in-out",
            indicatorClassName
          )}
        />
      </svg>
      {children && (
        <div
          data-slot="progress-circle-content"
          className="relative z-10 flex items-center justify-center text-sm font-medium"
        >
          {children}
        </div>
      )}
    </div>
  )
}

export { Progress, ProgressCircle }
