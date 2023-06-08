import jwt, { VerifyErrors } from "jsonwebtoken"
import { getUserById } from "./getUserById"

type VerifyResponse = {
  decodedToken: JwtPayload | undefined
  error: VerifyErrors | null
}

type JwtPayload = {
  user: User
}

export function getUserByToken(token: string | undefined) {
  return new Promise<VerifyResponse>(resolve => {
    jwt.verify(token!, process.env.PRIVATE_KEY, async (error, decodedToken) => {
      if (error) {
        resolve({ error, decodedToken: undefined })
      } else {
        resolve({ decodedToken: decodedToken as JwtPayload, error: null })
      }
    })
  })
}
