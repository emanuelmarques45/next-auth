import { api } from "@/lib/services/api"
import * as z from "zod"

export const signUpSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .refine(val => val.match(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/), {
      message: "Username must contain at least one letter"
    }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" })
})
export type SignUpSchemaType = z.infer<typeof signUpSchema>

export async function validateSignUp(data: SignUpData) {
  const validate = signUpSchema.safeParse(data)
  return {
    success: validate.success,
    errors:
      !validate.success &&
      validate.error.issues.map((issue: z.IssueData) => issue.message)
  }
}
