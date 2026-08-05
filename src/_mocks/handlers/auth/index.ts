import { challenge } from "./challenge"
import { me } from "./me"
import { verify } from "./verify"

export const authHandlers = [challenge, verify, me]
