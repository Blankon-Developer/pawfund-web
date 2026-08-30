import { authHandlers } from "./auth"
import { campaignsHandlers } from "./campaigns"
import { fundraiserHandlers } from "./fundraiser"

export const handlers = [
  ...campaignsHandlers,
  ...authHandlers,
  ...fundraiserHandlers,
]
