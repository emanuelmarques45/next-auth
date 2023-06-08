import type { NextApiRequest, NextApiResponse, NextPageContext } from "next"
import { query } from "@/lib/services/db"
import { getUserById } from "@/lib/utils/users/getUserById"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query
    const user = await getUserById(id as string)

    if (user) {
      return res.status(200).json(user)
    }

    return res.status(404).json({ message: "User not found" })
  }
  return res.status(405).json({ message: "Method not allowed" })
}
