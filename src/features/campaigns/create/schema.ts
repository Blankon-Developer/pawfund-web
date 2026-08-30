import { FileWithPreview } from "@/hooks/file-upload"
import { isAtLeast24HoursFromNow } from "@/utils/format-date"
import z from "zod"

export type LocationSchemaType = z.infer<typeof locationSchema>
export const locationSchema = z.object({
  country: z
    .string("Select a valid country")
    .min(1, "Please select a country."),
  zipCode: z.string().min(1, "Please enter your zip code."),
})

export type ImageSchemaType = z.infer<typeof imageSchema>
export const imageSchema = z.object({
  campaignImage: z.custom<FileWithPreview>().refine((v) => {
    if (!v) return false
    return true
  }, "Campaign image is required"),
})

export type OutlineSchemaType = z.infer<ReturnType<typeof outlineSchema>>
export const outlineSchema = (
  minValues: { title: number; shortDesc: number },
  maxValues: { title: number; shortDesc: number }
) =>
  z.object({
    title: z
      .string()
      .min(
        minValues.title,
        `The campaign title is too short, recommended ${minValues.title} - ${maxValues.title} characters`
      )
      .max(
        maxValues.title,
        `The campaign title is too long, recommended ${minValues.title} - ${maxValues.title} characters`
      ),
    shortDescription: z
      .string()
      .min(
        minValues.shortDesc,
        `The short description is too short, recommended ${minValues.shortDesc} - ${maxValues.shortDesc} characters`
      )
      .max(
        maxValues.shortDesc,
        `The short description is too long, recommended ${minValues.shortDesc} - ${maxValues.shortDesc} characters`
      ),
  })

export type StorySchemaType = z.infer<ReturnType<typeof storySchema>>
export const storySchema = (minValues: number, maxValues: number) =>
  z.object({
    story: z
      .string()
      .min(
        minValues,
        `The short description is too short, recommended ${minValues} - ${maxValues} characters`
      )
      .max(
        maxValues,
        `The short description is too long, recommended ${minValues} - ${maxValues} characters`
      ),
  })

export type GoalSchemaType = z.infer<typeof goalSchema>
export const goalSchema = z.object({
  goalAmount: z.coerce
    .number<string>("Please enter a valid number")
    .refine((amount) => amount > 0, "Goal amount must be greater than 0"),
  endAt: z.coerce
    .date<string>("Please input a valid date")
    .refine(isAtLeast24HoursFromNow, "Must be at least more than 24 hours"),
})
