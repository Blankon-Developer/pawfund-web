import { create } from "zustand"
import {
  ImageSchemaType,
  LocationSchemaType,
  OutlineSchemaType,
  GoalSchemaType,
  StorySchemaType,
} from "./schema"

type CreateCampaignValuesStore = {
  location: LocationSchemaType | null
  image: ImageSchemaType | null
  outline: OutlineSchemaType | null
  story: StorySchemaType | null
  goal: GoalSchemaType | null
  setGoal: (value: GoalSchemaType) => void
  setImage: (value: ImageSchemaType) => void
  setLocation: (value: LocationSchemaType) => void
  setOutline: (value: OutlineSchemaType) => void
  setStory: (value: StorySchemaType) => void
  getIsValuesFilled: (onMissing?: (message: string) => void) => boolean
  getCompoundValue: () => Partial<
    LocationSchemaType &
      ImageSchemaType &
      OutlineSchemaType &
      StorySchemaType &
      GoalSchemaType
  >
}

const useCreateCampaignValuesStore = create<CreateCampaignValuesStore>()(
  (set, get) => ({
    goal: null,
    image: null,
    location: null,
    outline: null,
    story: null,
    setGoal: (value) => set({ goal: value }),
    setImage: (value) => set({ image: value }),
    setLocation: (value) => set({ location: value }),
    setOutline: (value) => set({ outline: value }),
    setStory: (value) => set({ story: value }),
    getCompoundValue: () => ({
      ...get().location,
      ...get().image,
      ...get().outline,
      ...get().story,
      ...get().goal,
    }),
    getIsValuesFilled: (onMissing) => {
      const values = get()
      const emptyValues = Object.entries(values)
        .filter(([, value]) => value == null)
        .map(([key]) => key)

      const isValuesFilled = emptyValues.length === 0

      if (!isValuesFilled) {
        onMissing?.(`Missing values: ${emptyValues.join(", ")}`)
      }

      return isValuesFilled
    },
  })
)

export { useCreateCampaignValuesStore }
