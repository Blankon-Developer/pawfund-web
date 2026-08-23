"use client"

import { useId, useState } from "react"
import { addHours, format, setHours, setMinutes } from "date-fns"

import { cn } from "@/utils"
import { Button } from "@/shadcn-ui/button"
import { Calendar } from "@/shadcn-ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn-ui/popover"
import { ScrollArea } from "@/shadcn-ui/scroll-area"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent } from "./shadcn-ui/card"
import { formatDate } from "@/utils/format-date"
import { Input } from "./shadcn-ui/input"
import { Label } from "./shadcn-ui/label"
import { Separator } from "./shadcn-ui/separator"

const timeSlots = [
  { available: true, time: "00:00" },
  { available: true, time: "01:00" },
  { available: true, time: "02:00" },
  { available: true, time: "03:00" },
  { available: true, time: "04:00" },
  { available: true, time: "05:00" },
  { available: true, time: "06:00" },
  { available: true, time: "07:00" },
  { available: true, time: "08:00" },
  { available: true, time: "09:00" },
  { available: true, time: "10:00" },
  { available: true, time: "11:00" },
  { available: true, time: "12:00" },
  { available: true, time: "13:00" },
  { available: true, time: "14:00" },
  { available: true, time: "15:00" },
  { available: true, time: "16:00" },
  { available: true, time: "17:00" },
  { available: true, time: "18:00" },
  { available: true, time: "19:00" },
  { available: true, time: "20:00" },
  { available: true, time: "21:00" },
  { available: true, time: "22:00" },
  { available: true, time: "23:00" },
]

type Props = {
  name?: string
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  disabled?: boolean
  invalid?: boolean
}

export function SelectDatetime({ value, onChange, disabled, invalid }: Props) {
  const id = useId()
  const tomorow = addHours(new Date(), 24)
  const [time, setTime] = useState<string | null>("00:00")

  const handleDateChange = (newDate?: Date) => {
    if (newDate) {
      if (time) {
        const [hours, minutes] = time?.split(":").map(Number)
        onChange?.(setMinutes(setHours(newDate, hours), minutes))
      } else {
        onChange?.(newDate)
      }
    }
  }

  const handleTimeChange = (time: string) => {
    setTime(time)
    if (value) {
      const [hours, minutes] = time.split(":").map(Number)
      onChange?.(setMinutes(setHours(value, hours), minutes))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="group/pick-date w-full justify-between bg-input/50"
          id={id}
          variant={"outline"}
          aria-invalid={invalid}
          disabled={disabled}
        >
          <span
            className={cn(
              "truncate font-normal text-muted-foreground",
              value && "text-foreground"
            )}
          >
            {value ? formatDate(value, { includeTime: true }) : "Pick a date"}
          </span>
          <CalendarIcon
            aria-hidden="true"
            className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="flex max-sm:flex-col">
              <Calendar
                disabled={[{ before: tomorow }]}
                mode="single"
                onSelect={handleDateChange}
                selected={value}
              />
              <div className="relative w-full max-sm:h-48 sm:w-40">
                <div className="absolute inset-0 py-4 max-sm:border-t">
                  <ScrollArea className="h-full sm:border-s">
                    <div className="space-y-3">
                      <div className="flex h-5 shrink-0 items-center px-5">
                        <p className="text-sm font-medium">
                          {value ? format(value, "EEEE, d") : "Pick a date"}
                        </p>
                      </div>
                      <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                        <div className="col-span-2 grid gap-1 sm:col-span-1">
                          <Label className="text-xs">Input Time</Label>
                          <Input
                            type="time"
                            step="3600"
                            defaultValue=""
                            className="h-8 border-border bg-background text-center text-sm font-medium"
                            value={time ?? ""}
                            onChange={(e) => handleTimeChange(e.target.value)}
                          />
                        </div>
                        <div className="relative col-span-2 my-2 sm:col-span-1">
                          <Separator />
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-nowrap text-muted-foreground">
                            or select
                          </span>
                        </div>
                        {timeSlots.map(({ time: timeSlot, available }) => (
                          <Button
                            className="w-full"
                            disabled={!available}
                            key={timeSlot}
                            onClick={() => handleTimeChange(timeSlot)}
                            size="sm"
                            variant={time === timeSlot ? "default" : "outline"}
                          >
                            {timeSlot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
