import Head from "next/head"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { SignUpSchemaType, signUpSchema } from "@/lib/utils/schemas/signUp"
import {
  ErrorMessage,
  Form,
  InputBox,
  formAnimation
} from "@/styles/components/form"
import { Container } from "@/styles/signup"
import { Button } from "@/styles/components/button"
import Router from "next/router"
import { ThreeCircles, ThreeDots } from "react-loader-spinner"
import { debounce } from "@/lib/utils/debounce"
import { api } from "@/lib/services/api"
import { Warning } from "@styled-icons/entypo/Warning"
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle"
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash"
import { EyeFill } from "@styled-icons/bootstrap/EyeFill"

export default function SignUp() {
  const auth = useAuth()
  const [usernameStatus, setUsernameStatus] = useState<{
    status: number
    message: string
  } | null>(null)
  const [serverErrors, setServerErrors] = useState<string[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const [usernameIsLoading, setUsernameIsLoading] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  async function onSubmit({ username, email, password }: SignUpData) {
    try {
      setIsLoading(true)
      const data = await auth.signUp({ username, email, password })
      setVerifyMessage(data.message)
      setServerErrors(null)
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      setServerErrors(error.response.data)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema)
  })

  function handleGetUser(username: string) {
    if (username.length < 3) return setUsernameStatus(null)
    debounce(async () => {
      try {
        setUsernameIsLoading(true)
        await api().get("/users", {
          params: {
            username: username
          }
        })
        setUsernameIsLoading(false)
        setUsernameStatus({
          status: 0,
          message: "This username is not available"
        })
      } catch (error) {
        setUsernameIsLoading(false)
        setUsernameStatus({
          status: 1,
          message: "This username is available"
        })
      }
      return
    }, 500)
  }

  const username = watch("username")
  useEffect(() => {
    handleGetUser(getValues("username"))
  }, [username, getValues])

  return (
    <>
      <Head>
        <title>Sign Up Page</title>
        <meta name="description" content="Generated by create next app" />
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
            <legend>Sign Up</legend>
            <InputBox>
              {usernameStatus && (
                <>
                  {usernameStatus.status === 0 ? (
                    <Warning
                      size={16}
                      color="var(--clr-indian-red)"
                      style={{
                        position: "absolute",
                        top: "-1.9rem",
                        right: "21.3rem"
                      }}
                    />
                  ) : (
                    <CheckCircle
                      size={16}
                      color="var(--clr-green)"
                      style={{
                        position: "absolute",
                        top: "-1.8rem",
                        right: "18.5rem"
                      }}
                    />
                  )}
                  <p
                    style={{
                      position: "absolute",
                      top: "-1.8rem",
                      right: ".5rem",
                      fontSize: "1.3rem",
                      color:
                        usernameStatus.status === 0
                          ? "var(--clr-indian-red)"
                          : "var(--clr-green)",
                      fontWeight: "600"
                    }}
                  >
                    {usernameStatus.message}
                  </p>
                </>
              )}
              {usernameIsLoading && (
                <ThreeCircles
                  height={30}
                  width={40}
                  color="var(--clr-lochmara-light)"
                  wrapperStyle={{
                    position: "absolute",
                    right: "0.5rem",
                    bottom: "0.5rem"
                  }}
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              )}
              <input
                {...register("username")}
                id="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
              />
              <label htmlFor="username">Username</label>
            </InputBox>
            {errors.username?.message && (
              <ErrorMessage>{errors.username.message.toString()}</ErrorMessage>
            )}
            <InputBox>
              <input
                {...register("email")}
                id="email"
                type="text"
                placeholder="Email"
                autoComplete="off"
              />
              <label htmlFor="email">Email</label>
            </InputBox>
            {errors.email?.message && (
              <ErrorMessage>{errors.email.message.toString()}</ErrorMessage>
            )}
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
            </InputBox>
            {errors.password?.message && (
              <ErrorMessage>{errors.password.message.toString()}</ErrorMessage>
            )}
          </fieldset>
          {serverErrors &&
            serverErrors.map((error, idx) => {
              return <ErrorMessage key={idx}>{error}</ErrorMessage>
            })}
          {verifyMessage && (
            <p
              style={{
                color: "var(--clr-green)",
                fontSize: "1.3rem",
                fontWeight: "600",
                marginTop: "1rem"
              }}
            >
              {verifyMessage}
            </p>
          )}
          <Button style={{ cursor: isLoading ? "progress" : "pointer" }}>
            {isLoading ? (
              <ThreeDots
                height={13}
                width={50}
                radius={9}
                color="var(--clr-white)"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  display: "block",
                  marginInline: "auto"
                }}
                visible={true}
              />
            ) : (
              "Sign Up"
            )}
          </Button>
          <p style={{ marginTop: "2rem", textAlign: "center" }}>
            Already have an account?
          </p>
          <Button type="button" onClick={() => Router.push("/signin")}>
            Sign In
          </Button>
        </Form>
      </Container>
    </>
  )
}
