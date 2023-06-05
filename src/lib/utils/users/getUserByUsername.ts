import { query } from "@/lib/services/db"

export async function getUserByUsername(username: string) {
  const sqlQuery = `SELECT id, username, email, password FROM user WHERE username = ?`
  const values = [username]
  const [rows] = await query(sqlQuery, values)
  const user: User = rows[0]

  if (user) {
    return user
  }

  return null
}
