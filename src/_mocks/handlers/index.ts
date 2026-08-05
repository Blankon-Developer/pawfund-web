import { authHandlers } from "./auth"
import { campaignsHandlers } from "./campaigns"

export const handlers = [...campaignsHandlers, ...authHandlers]
