import { z } from "zod";

export const bookSchema = z.object({
  ISBN: z
    .number()
    .int()
    .refine((num) => num >= 1000 && num <= 9999999999, {
      message: "ISBN should be between 4 to 10 digits",
    }),

  title: z.string().min(4, "Minimum 4 characters required"),

  author: z.string().min(3, "Should be at least 3 characters"),

  year: z
    .number()
    .int()
    .refine((num) => num >= 1000 && num <= 9999, {
      message: "Year must be in format YYYY",
    }),

  image: z
    .string()
    .min(5, "Invalid image URL")
    .startsWith("https://", { message: "Please provide a correct URL" }),

  status: z.enum(["available", "unavailable"]), // Fixed typo
});
