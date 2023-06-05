import Head from "next/head"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { SignInSchemaType, signInSchema } from "@/lib/utils/schemas/signIn"
import * as S from "@/styles/signin"
import { Grid } from "react-loader-spinner"

export default function SignIn() {
  const auth = useAuth()
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit({ email, password }: SignInData) {
    try {
      setIsLoading(true)
      await auth.signIn({ email, password })
      setIsLoading(false)
    } catch (error: any) {
      setServerError(error.response?.data.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema)
  })

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Container>
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <fieldset>
            <legend>Sign In</legend>
            <S.InputBox>
              <input
                {...register("email")}
                id="email"
                placeholder="Email"
                autoComplete="off"
              />
              <label htmlFor="email">Email</label>
              {errors.email?.message && (
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              )}
            </S.InputBox>
            <S.InputBox>
              <input
                {...register("password")}
                id="password"
                placeholder="Password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              {errors.password?.message && (
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              )}
            </S.InputBox>
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          </fieldset>
          <button>
            {isLoading ? (
              <Grid
                height="26"
                width="26"
                color="var(--clr-white)"
                ariaLabel="grid-loading"
                radius="12.5"
                visible={true}
                wrapperStyle={{
                  display: "block",
                  margin: "0 auto"
                }}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </S.Container>
    </>
  )
}