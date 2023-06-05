import * as z from "zod"

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty("Password is required")
})

export type SignInSchemaType = z.infer<typeof signInSchema>

export function validateSignIn(data: SignInData) {
  return signInSchema.safeParse(data)
}
