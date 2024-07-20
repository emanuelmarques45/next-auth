import { query } from "@/lib/services/db"
import { getUserByToken } from "@/lib/utils/users/getUserByToken"
import type { NextApiRequest, NextApiResponse } from "next"
import { VerifyErrors } from "jsonwebtoken"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { token } = req.query
    const { error, decodedToken } = await getUserByToken(token as string)

    if (error) {
      const errorPage = `
      <html>
        <head>
          <title>You are not verified</title>
        </head>
        <body>
          <h1 style="color: red;">Error</h1>
          <p>The token is invalid or has expired</p>
        </body>
      </html>
      `

      return res.status(400).send(errorPage)
    }

    const sqlQuery = `UPDATE user SET verified = 1 WHERE id = ?`
    const values = [decodedToken?.user.id]
    await query(sqlQuery, values)

    const verifiedPage = `
    <html>
      <head>
        <title>You are verified</title>
      </head>
      <body>
        <h1 style="color: green;">Success</h1>
        <p>Hi ${decodedToken?.user.username}, your email has been verified successfully</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/signin">Sign in now!</a>
      </body>
    </html>
    `

    return res.status(200).send(verifiedPage)
  }

  res.status(405).json({ message: "Method not allowed" })
}
