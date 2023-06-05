// import type { NextApiRequest, NextApiResponse } from "next"
// import { query } from "@/lib/services/db"
// import * as bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// import { parseCookies } from "nookies"
// import { handleTokenVerification } from "@/lib/utils/verifyToken"

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "PUT") {
//     if (req.query.edit === "username") {
//       const token = req.headers.authorization?.split(" ")[1] as string
//       await handleTokenVerification(token, res)
//       // const userId = user?.user.id
//       // const { username } = req.body
//       // const sqlQuery = `UPDATE user SET username = ? WHERE id = ?`
//       // const [rows] = await query(sqlQuery, [username, userId])

//       return res.json({ message: "Username changed with success" })
//     }
//     return res.status(400).json({ message: "Bad request" })
//   }
//   return res.status(405).json({ message: "Method not allowed" })
// }
