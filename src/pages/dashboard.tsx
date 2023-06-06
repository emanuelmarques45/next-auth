import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/lib/services/api"
import { debounce } from "@/lib/utils/debounce"
import { GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"
import { useState } from "react"

type DashboardProps = {
  users: User[]
}

export default function Dashboard({ users }: DashboardProps) {
  const [usernameError, setUsernameError] = useState("")
  const auth = useAuth()

  function getUser(username: string) {
    debounce(async () => {
      try {
        const { data } = await api().get("/users", {
          params: {
            username
          }
        })
      } catch (error: any) {
        console.log(error.response.data)
      }
    }, 500)
  }

  return (
    <>
      <h1 style={{ marginBottom: "5rem" }}>Dashboard</h1>
      {users.map((user, idx) => {
        return (
          <div key={user.id} style={{ border: "1px solid black" }}>
            <h1>{user.username}</h1>
            <h3>{user.email}</h3>
          </div>
        )
      })}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { "nextauth.token": token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  const { data: users } = await api(ctx).get("/users")

  return {
    props: { users }
  }
}
