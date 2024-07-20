import { api } from "@/lib/services/api"
import Router from "next/router"
import { destroyCookie, setCookie } from "nookies"
import { createContext, useContext, useState } from "react"

type AuthContextProps = {
  isAuthenticated: boolean
  signUp: ({
    username,
    email,
    password
  }: SignUpData) => Promise<{ message: string }>
  signIn: ({ email, password }: SignInData) => Promise<void>
  signOut: () => void
}
export const AuthContext = createContext({} as AuthContextProps)

type AuthContextProviderProps = {
  children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn({ email, password }: SignInData) {
    const {
      data: { token }
    } = await api().post("/auth/signin", {
      email,
      password
    })
    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1
    })
    api().defaults.headers["Authorization"] = `Bearer ${token}`
    Router.push("/dashboard")
  }

  async function signUp({ username, email, password }: SignUpData) {
    const { data } = await api().post("/auth/signup", {
      username,
      email,
      password
    })
    setTimeout(() => {
      Router.push("/signin")
    }, 3000)
    return data
  }

  async function signOut() {
    destroyCookie(undefined, "nextauth.token", {})
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null)
      }, 2000)
    })
    Router.push("/signin")
  }

  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated: true, signIn, signUp, signOut }}
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
