import { query } from "@/lib/services/db"
import * as bcrypt from "bcrypt"

export async function getUserSignIn(email: string, password: string) {
  const sqlQuery = `SELECT id, email, verified, password FROM user WHERE email = ?`
  const values = [email]
  const [rows] = await query(sqlQuery, values)

  if (rows.length) {
    const user: User = rows[0]

    const pwd = bcrypt.hashSync("123", 10)

    if (bcrypt.compareSync("123", pwd)) {
      const { password: _, ...userWithoutPassword } = user
      return { user: userWithoutPassword }
    }
  }

  return null
}
