import type { NextApiRequest, NextApiResponse } from "next"
import { query } from "@/lib/services/db"
import * as bcrypt from "bcrypt"
import { getUserByEmail } from "@/lib/utils/users/getUserByEmail"
import { getUserByUsername } from "@/lib/utils/users/getUserByUsername"
import { validateSignUp } from "@/lib/utils/schemas/signUp"
import crypto from "crypto"
import { sendEmailVerification } from "@/lib/services/nodemailer"
import jwt from "jsonwebtoken"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body

    const validate = await validateSignUp({
      email,
      username,
      password
    })

    if (!validate.success) {
      return res.status(400).json({ errors: validate.errors })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const id = crypto.randomUUID()
    const sqlQuery = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`
    const values = [id, username, email, hashedPassword]
    const errors: string[] = []

    if (await getUserByUsername(username)) {
      errors.push("This username has already an account")
    }

    if (await getUserByEmail(email)) {
      errors.push("This email has already an account")
    }

    if (errors.length) return res.status(409).json(errors)

    const token = jwt.sign(
      { user: { id, username, email } },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    )

    sendEmailVerification(email, token)

    const [rows] = await query(sqlQuery, values)

    return res
      .status(201)
      .json({ message: "An email verify was sent to you, please check it" })
  }

  res.status(405).json({ message: "Method not allowed" })
}
