import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isValid,
} from "date-fns"

type TimeUnit = "Day" | "Hour" | "Minute" | "Second"

/**
 * Calculates the relative time remaining until a given date.
 * @param date The target date, either as a Date object or an ISO 8601 string.
 * @returns A string representing the time remaining (e.g., "2 days left", "5 hours left", "Finished").
 * @example
 * timeRemaining("2024-12-31T23:59:59Z") // "1 day left"
 */
function timeRemaining(date: Date | string): string {
  const target = new Date(date)

  if (!isValid(target)) {
    return "Invalid date"
  }

  const now = new Date()

  const seconds = differenceInSeconds(target, now)

  if (seconds <= 0) return "Finished"

  const units: [number, TimeUnit][] = [
    [differenceInDays(target, now), "Day"],
    [differenceInHours(target, now), "Hour"],
    [differenceInMinutes(target, now), "Minute"],
    [seconds, "Second"],
  ]

  const [value, unit] = units.find(([value]) => value > 0)!

  return `${value} ${unit}${value !== 1 ? "s" : ""} left`
}

export { timeRemaining }
