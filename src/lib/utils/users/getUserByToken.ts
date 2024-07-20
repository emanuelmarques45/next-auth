import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken"

type VerifyResponse = {
  decodedToken: JwtPayload | undefined
  error: VerifyErrors | null
}

export async function getUserByToken(
  token: string | undefined
): Promise<VerifyResponse> {
  return new Promise<VerifyResponse>(resolve => {
    if (!token) {
      resolve({
        error: new Error("Token is undefined") as VerifyErrors,
        decodedToken: undefined
      })
      return
    }

    jwt.verify(token, process.env.PRIVATE_KEY!, async (error, decodedToken) => {
      if (error) {
        resolve({ error, decodedToken: undefined })
      } else {
        resolve({ decodedToken: decodedToken as JwtPayload, error: null })
      }
    })
  })
}
