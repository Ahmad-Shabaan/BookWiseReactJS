import * as z from "zod";

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Display name is required")
      .max(50, "Display name must be at most 50 characters"),

    firstName: z
      .string()
      .min(2, "First name is required")
      .max(50, "First name is too long")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
        "First name contains invalid characters",
      ),

    lastName: z
      .string()
      .min(2, "Last name is required")
      .max(50, "Last name is too long")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
        "Last name contains invalid characters",
      ),

    email: z.email("Please enter a valid email address"),

    phoneNumber: z
      .string()
      .min(7, "Phone number is wrong")
      .max(20, "Phone number is wrong")
      .regex(/^[+]?[0-9\s\-().]+$/, "Phone number contains invalid characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),

    confirmPassword: z.string().min(8, "Please confirm your password"),

    country: z
      .string()
      .min(2, "Country is required")
      .max(100, "Country name is too long"),

    city: z
      .string()
      .min(2, "City is required")
      .max(100, "City name is too long"),

    state: z
      .string()
      .min(2, "State / Governorate is required")
      .max(100, "State name is too long"),

    street: z
      .string()
      .min(3, "Street address is required")
      .max(200, "Street address is too long"),

    postalCode: z
      .string()
      .min(3, "Postal code is required")
      .max(20, "Postal code is wrong")
      .regex(/^[A-Za-z0-9\s-]+$/, "Postal code contains invalid characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
