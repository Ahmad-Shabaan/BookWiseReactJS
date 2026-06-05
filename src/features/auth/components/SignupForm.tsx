import { Link } from "react-router-dom";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Navigation,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { signupSchema, type SignupFormValues } from "../schemas/signup.schema";
import FieldWrapper from "./FieldWrapper";
import type { SignupFormProps } from "../types/auth.types";
import SectionDivider from "./SectionDivider";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";

export default function SignupForm({
  onSubmit,
  isLoading = false,
  error,
  isSignupError = false,
}: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      country: "",
      city: "",
      state: "",
      street: "",
      postalCode: "",
    },
  });

  const submitHandler = (data: SignupFormValues) => onSubmit(data);

  return (
    <form
      id="signup-form"
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 w-full"
      data-animate="form"
      noValidate
    >
      {/* ── Server error — identical to LoginForm ── */}
      {isSignupError && <ErrorMessage msg={error} />}
      {/* {isSignupError ? (
        <div>
          {er.map((err, idx) => (
            <div
              key={idx}
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-error/20
                         bg-error/8 px-4 py-3 text-sm text-error mb-2"
            >
              <span className="mt-px text-base leading-none">⚠</span>
              {err}
            </div>
          ))}
        </div>
      ) : (
        error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-error/20
                     bg-error/8 px-4 py-3 text-sm text-error"
          >
            <span className="mt-px text-base leading-none">⚠</span>
            {error}
          </div>
        )
      )} */}

      {/* ════════════════════════════════════════
          SECTION — Personal Info
      ════════════════════════════════════════ */}
      <SectionDivider label="Personal info" />

      {/* Display name */}
      <FieldWrapper
        id="signup-displayName"
        label="Display Name"
        errorId="displayName-error"
        errorMessage={errors.displayName?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <User className="size-4" />
          </div>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-displayName"
                type="text"
                placeholder="JohnDoe123"
                autoComplete="nickname"
                aria-invalid={!!errors.displayName}
                aria-describedby={
                  errors.displayName ? "displayName-error" : undefined
                }
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper
          id="signup-firstName"
          label="First Name"
          errorId="firstName-error"
          errorMessage={errors.firstName?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <User className="size-4" />
            </div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-firstName"
                  type="text"
                  placeholder="John"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper
          id="signup-lastName"
          label="Last Name"
          errorId="lastName-error"
          errorMessage={errors.lastName?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <User className="size-4" />
            </div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-lastName"
                  type="text"
                  placeholder="Doe"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>
      </div>

      {/* Email */}
      <FieldWrapper
        id="signup-email"
        label="Email Address"
        errorId="email-error"
        errorMessage={errors.email?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <Mail className="size-4" />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* Phone */}
      <FieldWrapper
        id="signup-phone"
        label="Phone Number"
        errorId="phone-error"
        errorMessage={errors.phoneNumber?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <Phone className="size-4" />
          </div>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={
                  errors.phoneNumber ? "phone-error" : undefined
                }
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* ════════════════════════════════════════
          SECTION — Security
      ════════════════════════════════════════ */}
      <SectionDivider label="Security" />

      {/* Password */}
      <FieldWrapper
        id="signup-password"
        label="Password"
        errorId="password-error"
        errorMessage={errors.password?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <Lock className="size-4" />
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="pl-11 pr-12"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-4
                       text-on-surface-variant transition-colors hover:text-on-surface"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </FieldWrapper>

      {/* Confirm Password */}
      <FieldWrapper
        id="signup-confirmPassword"
        label="Confirm Password"
        errorId="confirmPassword-error"
        errorMessage={errors.confirmPassword?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <Lock className="size-4" />
          </div>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                className="pl-11 pr-12"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-4
                       text-on-surface-variant transition-colors hover:text-on-surface"
          >
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </FieldWrapper>

      {/* ════════════════════════════════════════
          SECTION — Address
      ════════════════════════════════════════ */}
      <SectionDivider label="Address" />

      {/* Country + City */}
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper
          id="signup-country"
          label="Country"
          errorId="country-error"
          errorMessage={errors.country?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <MapPin className="size-4" />
            </div>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-country"
                  type="text"
                  placeholder="Egypt"
                  autoComplete="country-name"
                  aria-invalid={!!errors.country}
                  aria-describedby={
                    errors.country ? "country-error" : undefined
                  }
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper
          id="signup-city"
          label="City"
          errorId="city-error"
          errorMessage={errors.city?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <Building2 className="size-4" />
            </div>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-city"
                  type="text"
                  placeholder="Cairo"
                  autoComplete="address-level2"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>
      </div>

      {/* State */}
      <FieldWrapper
        id="signup-state"
        label="State / Governorate"
        errorId="state-error"
        errorMessage={errors.state?.message}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                       pl-4 text-on-surface-variant transition-colors duration-200
                       group-focus-within:text-primary"
          >
            <MapPin className="size-4" />
          </div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="signup-state"
                type="text"
                placeholder="Giza"
                autoComplete="address-level1"
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? "state-error" : undefined}
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* Street + Postal Code */}
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper
          id="signup-street"
          label="Street"
          errorId="street-error"
          errorMessage={errors.street?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <Navigation className="size-4" />
            </div>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-street"
                  type="text"
                  placeholder="123 Main St"
                  autoComplete="street-address"
                  aria-invalid={!!errors.street}
                  aria-describedby={errors.street ? "street-error" : undefined}
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper
          id="signup-postalCode"
          label="Postal Code"
          errorId="postalCode-error"
          errorMessage={errors.postalCode?.message}
        >
          <div className="group relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center
                         pl-4 text-on-surface-variant transition-colors duration-200
                         group-focus-within:text-primary"
            >
              <MapPin className="size-4" />
            </div>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="signup-postalCode"
                  type="text"
                  placeholder="12345"
                  autoComplete="postal-code"
                  aria-invalid={!!errors.postalCode}
                  aria-describedby={
                    errors.postalCode ? "postalCode-error" : undefined
                  }
                  className="pl-11 pr-4"
                />
              )}
            />
          </div>
        </FieldWrapper>
      </div>

      {/* ── Submit — identical gradient button to LoginForm ── */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className=" btn-primary font-bold rounded-md
          "
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-full border-2 border-on-primary/30
                         border-t-on-primary animate-spin"
              />
              Creating account…
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </div>

      {/* ── Sign in link — mirrors LoginForm's "Sign up" link ── */}
      <p className="text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-primary transition-colors hover:text-secondary"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
