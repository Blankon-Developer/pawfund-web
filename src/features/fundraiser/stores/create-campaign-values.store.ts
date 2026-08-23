import { create } from "zustand"
import { schemas } from "../components/create-campaign/forms"

type CreateCampaignValuesStore = {
  location: schemas.LocationSchemaType | null
  image: schemas.ImageSchemaType | null
  outline: schemas.OutlineSchemaType | null
  story: schemas.StorySchemaType | null
  goal: schemas.GoalSchemaType | null
  setGoal: (value: schemas.GoalSchemaType) => void
  setImage: (value: schemas.ImageSchemaType) => void
  setLocation: (value: schemas.LocationSchemaType) => void
  setOutline: (value: schemas.OutlineSchemaType) => void
  setStory: (value: schemas.StorySchemaType) => void
  getIsValuesFilled: (onMissing?: (message: string) => void) => boolean
  getCompoundValue: () => Partial<
    schemas.LocationSchemaType &
      schemas.ImageSchemaType &
      schemas.OutlineSchemaType &
      schemas.StorySchemaType &
      schemas.GoalSchemaType
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
