import { api, controller } from "@/lib/services/api"
import Router from "next/router"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextProps = {
  isAuthenticated: boolean
  user: User | null
  signUp: ({ username, email, password }: SignUpData) => Promise<void>
  signIn: ({ email, password }: SignInData) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

type AuthContextProviderProps = {
  children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthContextProps["user"]>(null)
  useEffect(() => {
    const { "nextauth.token": token } = parseCookies()
  }, [])

  async function signIn({ email, password }: SignInData) {
    const {
      data: { token }
    } = await api().post("/auth/signin", {
      email,
      password
    })
    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1,
      sameSite: "strict"
    })
    Router.push("/dashboard")
  }

  async function signUp({ username, email, password }: SignUpData) {
    await api().post("/auth/signup", {
      username,
      email,
      password
    })
    Router.push("/signin")
  }

  async function signOut() {
    console.log("ola")
    destroyCookie(undefined, "nextauth.token", {})
    Router.push("/signin")
  }

  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated: true, user, signIn, signUp, signOut }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export function useAuth() {
  const auth = useContext(AuthContext)

  return auth
}
