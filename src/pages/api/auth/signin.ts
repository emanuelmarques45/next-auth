import type { NextApiRequest, NextApiResponse } from "next"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "@/lib/utils/users/getUserByEmail"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body
    const user = await getUserByEmail(email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Email or password incorrects" })
    }

    const { password: pwd, ...userWithoutPwd } = user

    const token = jwt.sign(
      {
        sub: user.id,
        user: userWithoutPwd
      },
      process.env.PRIVATE_KEY
    )

    return res.status(200).json({
      token,
      user: userWithoutPwd
    })
  }

  res.status(405).json({ message: "Method not allowed" })
}
