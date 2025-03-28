import { z } from "zod";

export const bookSchema = z.object({
  ISBN: z
    .string()
    .regex(/^\d{4,11}$/, "ISBN must be between 4 to 11 digits")
    .min(4, "Minimum 4 characters required")
    .max(11, "Maximum 11 characters allowed")
    .optional(),

  title: z.string().min(4, "Minimum 4 characters required"),

  author: z.string().min(3, "Should be at least 3 characters"),

  year: z.string().transform((val) => parseInt(val, 10)).optional(),

  image: z
    .string()
    .min(5, "Invalid image URL")
    .regex(/^(https?:\/\/)/, "Image URL must start with http or https")
    .regex(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, "Invalid image format"),

  status: z.enum(["available", "unavailable"]),
});
