import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";

import GoogleIcon from "@/assets/icons/google.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import FieldWrapper from "./FieldWrapper";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";
import type { LoginFormProps } from "../types/auth.types";


export default function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  isLoginError = false,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const submitHandler = (data: LoginSchema) =>
    onSubmit(data.email, data.password);

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 w-full max-w-md lg:max-w-full "
      noValidate
      data-animate="form"
    >
      {/* ── Server error ── */}
      {isLoginError && (
        <ErrorMessage msg={error} />

      )}

      {/* ── Email ── */}
      <FieldWrapper
        id="login-email"
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
                id="login-email"
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

      {/* ── Password ── */}
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
                placeholder="•••••••••••••••"
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
      <div className="flex items-center justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          Forgot password?
        </Link>
      </div>

      {/* ── Submit ── */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary mt-1 font-bold rounded-md"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-full border-2 border-on-primary/30
                             border-t-on-primary animate-spin"
              />
              Signing in…
            </span>
          ) : (
            "Sign In to Account"
          )}
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="relative flex items-center py-1">
        <div
          className="grow border-t border-outline-variant/15"
          aria-hidden="true"
        />
        <span className="px-4 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant/60">
          Or continue with
        </span>
        <div
          className="grow border-t border-outline-variant/15"
          aria-hidden="true"
        />
      </div>

      {/* ── Social buttons ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Google",
            icon: (
              <img src={GoogleIcon} alt="Google" className="size-4 shrink-0" />
            ),
            ariaLabel: "Sign in with Google",
          },
          {
            label: "GitHub",
            icon: (
              <img src={GitHubIcon} alt="GitHub" className="size-4 shrink-0" />
            ),
            ariaLabel: "Sign in with GitHub",
          },
        ].map(({ label, icon, ariaLabel }) => (
          <button
            key={label}
            type="button"
            aria-label={ariaLabel}
            className="flex items-center justify-center gap-2.5 rounded-xl
                       border border-outline-variant/15
                       bg-surface-container-highest px-4 py-3
                       text-sm font-semibold text-on-surface
                       transition-all duration-200
                       hover:border-outline-variant/30 hover:bg-surface-bright
                       active:scale-[0.98]
                       "
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* ── Sign up ── */}
      <p className="text-center text-sm text-on-surface-variant">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-primary transition-colors hover:text-secondary"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
