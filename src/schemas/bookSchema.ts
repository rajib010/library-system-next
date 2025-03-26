import { z } from "zod";

export const bookSchema = z.object({
  ISBN: z.string().min(4, "Minimum 4 characters required"),

  title: z.string().min(4, "Minimum 4 characters required"),

  author: z.string().min(3, "Should be at least 3 characters"),

  year: z.string().transform((val) => parseInt(val, 10)),

  image: z
    .string()
    .min(5, "Invalid image URL")
    .startsWith("https://", { message: "Please provide a correct URL" }),

  status: z.enum(["available", "unavailable"]),
});
