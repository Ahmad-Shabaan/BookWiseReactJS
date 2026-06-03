import * as z from "zod";
export const addressSchema = z.object({
   deliveryMethodId: z
  .string()
  .nonempty("Delivery method is required"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
      "First name contains invalid characters",
    ),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Last name contains invalid characters"),

  country: z
    .string()
    .min(2, "Country is required")
    .max(100, "Country name is too long"),

  city: z.string().min(2, "City is required").max(100, "City name is too long"),

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
    .max(20, "Postal code is too long")
    .regex(/^[A-Za-z0-9\s-]+$/, "Postal code contains invalid characters"),

});
export type AddressSchema = z.infer<typeof addressSchema>;
