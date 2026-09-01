import {
  addHours,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isBefore,
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

/**
 * Formats a date into a human-readable string.
 * @param date The date to format, either as a Date object or an ISO 8601 string.
 * @param options.includeTime Whether to include the time in the output. Defaults to false.
 * @returns A formatted date string.
 * @example
 * formatDate("2026-08-21T08:19:53.854Z")                   // "21 August 2026"
 * formatDate("2026-08-21T08:19:53.854Z", { includeTime: true }) // "21 August 2026, 15:19"
 */
function formatDate(
  date: Date | string,
  options: { includeTime?: boolean } = {}
): string {
  const target = new Date(date)
  if (!isValid(target)) {
    return "Invalid date"
  }
  const pattern = options.includeTime ? "d MMMM yyyy, HH:mm" : "d MMMM yyyy"
  return format(target, pattern)
}

/**
 * Validate if the date is at least 24 hours from now
 * @param date The target date, either as a Date object or an ISO 8601 string.
 * @returns True if the date is at least 24 hours from now, false otherwise.
 * @example
 * isAtLeast24HoursFromNow("2026-08-21T08:19:53.854Z") // true
 */
function isAtLeast24HoursFromNow(date: Date | string): boolean {
  const target = new Date(date)
  const minimum = addHours(new Date(), 24)

  return !isBefore(target, minimum)
}

/**
 * Formats a date into a relative date string (e.g., "2 minutes ago", "2 hours ago", "2 days ago", "28 November 2026, 15:23").
 * @param date The date to format, either as a Date object or an ISO 8601 string.
 * @returns A formatted relative date string.
 * @example
 * formatRelativeDate("2026-08-21T08:19:53.854Z") // "21 August 2026, 15:19"
 */
function formatRelativeDate(date: Date | string): string {
  const target = typeof date === "string" ? new Date(date) : date

  if (!isValid(target)) {
    return "-"
  }

  const minutes = differenceInMinutes(new Date(), target)

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "Minute" : "Minutes"} ago`
  }

  const hours = differenceInHours(new Date(), target)

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "Hour" : "Hours"} ago`
  }

  return format(target, "d MMMM yyyy, HH:mm")
}

export {
  timeRemaining,
  formatDate,
  isAtLeast24HoursFromNow,
  formatRelativeDate,
}
