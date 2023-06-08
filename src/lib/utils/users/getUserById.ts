import { query } from "@/lib/services/db"

export async function getUserById(id: string) {
  const sqlQuery = `SELECT id, username, email FROM user WHERE id = ?`
  const values = [id]
  const [rows] = await query(sqlQuery, values)
  const user: User = rows[0]

  if (user) {
    return user
  }

  return null
}
