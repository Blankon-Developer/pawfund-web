import { authHandlers } from "./auth"
import { campaignsHandlers } from "./campaigns"
import { fundraiserHandlers } from "./fundraiser"
import { supporterHandlers } from "./supporter"

export const handlers = [
  ...campaignsHandlers,
  ...authHandlers,
  ...fundraiserHandlers,
  ...supporterHandlers,
]
