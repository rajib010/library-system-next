import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(12, { message: "Max 12 characters allowed" })
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must only contain letters, numbers, and underscores" });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
