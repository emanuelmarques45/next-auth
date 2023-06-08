import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { getUserSignIn } from "@/lib/utils/users/getUserSignIn"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body

    const data = await getUserSignIn(email, password)

    if (!data?.user) {
      return res.status(404).json({ message: "Email or password incorrects" })
    }

    if (!data.user.verified) {
      return res.status(404).json({ message: "Email not verified" })
    }

    const token = jwt.sign(data.user, process.env.PRIVATE_KEY, {
      expiresIn: "1d"
    })

    return res.status(200).json({ token, user: data.user })
  }

  res.status(405).json({ message: "Method not allowed" })
}
