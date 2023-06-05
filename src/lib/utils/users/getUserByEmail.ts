import { query } from "@/lib/services/db"

export async function getUserByEmail(email: string) {
  const sqlQuery = `SELECT id, username, email, password FROM user WHERE email = ?`
  const values = [email]
  const [rows] = await query(sqlQuery, values)
  const user: User = rows[0]

  if (user) {
    return user
  }

  return null
}
