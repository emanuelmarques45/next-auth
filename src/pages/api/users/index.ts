import type { NextApiRequest, NextApiResponse, NextPageContext } from "next"
import { query } from "@/lib/services/db"
import jwt from "jsonwebtoken"
import { getUserByToken } from "@/lib/utils/users/getUserByToken"
import { parseCookies } from "nookies"
import { getHeaderToken } from "@/lib/utils/getHeaderToken"
import { getUserByUsername } from "@/lib/utils/users/getUserByUsername"
import { getUserByEmail } from "@/lib/utils/users/getUserByEmail"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.username) {
      const user = await getUserByUsername(req.query.username as string)

      if (user) {
        return res.status(200).json(user)
      }

      return res.status(404).json({ message: "User not found" })
    }
    if (req.query.email) {
      const user = await getUserByEmail(req.query.email as string)

      if (user) {
        return res.status(200).json(user)
      }

      return res.status(404).json({ message: "User not found" })
    }
    if (req.query.token) {
      const { error, decodedToken } = await getUserByToken(
        req.query.token as string
      )

      if (error) {
        return res.status(200).json("Your token is invalid or has expired")
      }

      return res.status(404).json({ token: decodedToken })
    }

    const sqlQuery = `SELECT id, username, email FROM user`
    const [rows] = await query(sqlQuery)
    return res.status(200).json(rows)
  }
  return res.status(405).json({ message: "Method not allowed" })
}
