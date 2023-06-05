import type { NextApiRequest, NextApiResponse } from "next"
import { query } from "@/lib/services/db"
import * as bcrypt from "bcrypt"
import { getUserByEmail } from "@/lib/utils/users/getUserByEmail"
import { getUserByUsername } from "@/lib/utils/users/getUserByUsername"
import { validateSignUp } from "@/lib/utils/schemas/signUp"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, username, password } = req.body
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const sqlQuery = `INSERT INTO user (email, username, password) VALUES (?, ?, ?)`
    const values = [email, username, encryptedPassword]

    const validate = validateSignUp({
      email,
      username,
      password
    })

    if (!validate.success) {
      return res.status(400).json({ errors: validate.error.issues[0].message })
    }

    if (await getUserByUsername(username)) {
      return res.status(409).json({ message: "This username is already taken" })
    }

    if (await getUserByEmail(email)) {
      return res
        .status(409)
        .json({ message: "This email has already an account" })
    }

    const [rows] = await query(sqlQuery, values)

    return res
      .status(201)
      .json({ message: "Account created successfully", rows })
  }

  res.status(405).json({ message: "Method not allowed" })
}
