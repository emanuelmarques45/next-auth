import Head from "next/head"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { SignInSchemaType, signInSchema } from "@/lib/utils/schemas/signIn"
import { Container } from "@/styles/signin"
import { ThreeDots } from "react-loader-spinner"
import Router from "next/router"
import {
  InputBox,
  Form,
  formAnimation,
  ErrorMessage
} from "@/styles/components/form"
import { Button } from "@/styles/components/button"
import { GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"
import { EyeFill, EyeSlash } from "styled-icons/bootstrap"

export default function SignIn() {
  const auth = useAuth()
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  async function onSubmit({ email, password }: SignInData) {
    try {
      setIsLoading(true)
      await auth.signIn({ email, password })
      setIsLoading(false)
    } catch (error: any) {
      setServerError(error.response?.data.message)
      setIsLoading(false)
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
        <title>Sign In Page</title>
        <meta name="description" content="Next App - Sign In Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Form
          onSubmit={handleSubmit(data => onSubmit(data))}
          variants={formAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <fieldset>
            <legend>Sign In</legend>
            <InputBox>
              <input {...register("email")} id="email" placeholder="Email" />
              <label htmlFor="email">Email</label>
              {errors.email?.message && (
                <ErrorMessage>{errors.email.message.toString()}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              {isPasswordVisible ? (
                <EyeFill
                  size={30}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "0.5rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <EyeSlash
                  size={30}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "0.5rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setIsPasswordVisible(true)}
                />
              )}
              <input
                {...register("password")}
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
              {errors.password?.message && (
                <ErrorMessage>
                  {errors.password.message.toString()}
                </ErrorMessage>
              )}
              {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
            </InputBox>
          </fieldset>
          <Button>
            {isLoading ? (
              <ThreeDots
                height="13"
                width="50"
                radius="9"
                color="var(--clr-white)"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  display: "block",
                  marginInline: "auto"
                }}
                visible={true}
              />
            ) : (
              "Sign In"
            )}
          </Button>
          <p style={{ marginTop: "2rem", textAlign: "center" }}>
            Don&apos;t have an account?
          </p>
          <Button type="button" onClick={() => Router.push("/signup")}>
            Sign Up
          </Button>
        </Form>
      </Container>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { "nextauth.token": token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
