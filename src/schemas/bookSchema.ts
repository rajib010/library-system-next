import { z } from "zod";

export const bookSchema = z.object({
  ISBN: z
    .string()
    .regex(/^\d{4,10}$/, "ISBN must be between 4 to 10 digits")
    .min(4, "Minimum 4 characters required")
    .max(10, "Maximum 10 characters allowed"),

  title: z.string().min(4, "Minimum 4 characters required"),

  author: z.string().min(3, "Should be at least 3 characters"),

  year: z.string().transform((val) => parseInt(val, 10)),

  image: z
    .string()
    .min(5, "Invalid image URL")
    .regex(/^(https?:\/\/)/, "Image URL must start with http or https")
    .regex(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, "Invalid image format"),

  status: z.enum(["available", "unavailable"]),
});
