import type { NextApiRequest, NextApiResponse, NextPageContext } from "next"
import { query } from "@/lib/services/db"
import jwt from "jsonwebtoken"
import { verifyToken } from "@/lib/utils/verifyToken"
import { parseCookies } from "nookies"
import { getHeaderToken } from "@/lib/utils/getHeaderToken"
import { getUserByUsername } from "@/lib/utils/users/getUserByUsername"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const token = getHeaderToken(req)
    // const { error, decodedToken } = await verifyToken(token)

    // if (error) {
    //   return res.status(401).json({ message: "Unauthorized" })
    // }

    if (req.query.username) {
      const user = await getUserByUsername(req.query.username as string)

      if (user) {
        return res.status(200).json(user)
      }

      return res.status(404).json({ message: "User not found" })
    }
    if (req.query.email) {
      const sqlQuery = `SELECT id, username, email FROM user WHERE email = ?`
      const [rows] = await query(sqlQuery, [req.query.email])

      if (rows.length) {
        return res.status(200).json(rows[0])
      }

      return res.status(404).json({ message: "User not found" })
    }
    // if (req.query.token) {
    //   const sqlQuery = `SELECT id, username, email FROM user WHERE id = ?`
    //   const [rows] = await query(sqlQuery, [decodedToken?.user.id])

    //   if (rows.length) {
    //     return res.status(200).json(rows[0])
    //   }

    //   return res.status(404).json({ message: "User not found" })
    // }

    const sqlQuery = `SELECT id, username, email FROM user`
    const [rows] = await query(sqlQuery)
    return res.status(200).json(rows)
  }
  return res.status(405).json({ message: "Method not allowed" })
}
