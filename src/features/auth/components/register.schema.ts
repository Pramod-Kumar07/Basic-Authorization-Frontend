import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be atleast 3 characters."),
  email: z.string().trim().email("Enter a valid email."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
