import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken"

type VerifyResponse = {
  decodedToken: JwtPayload | undefined
  error: VerifyErrors | null
}

export function verifyToken(token: string | undefined) {
  return new Promise<VerifyResponse>(resolve => {
    jwt.verify(token!, process.env.PRIVATE_KEY, (error, decodedToken) => {
      if (error) {
        resolve({ error, decodedToken: undefined })
      } else {
        resolve({ decodedToken, error: null })
      }
    })
  })
}
