import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";

import GoogleIcon from "@/assets/icons/google.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import FieldWrapper from "./FieldWrapper";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error = null,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitHandler = (data: LoginSchema) =>
    onSubmit(data.email, data.password);

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-5"
      noValidate
      data-animate="form"
    >
      {/* ── Server error ── */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-error/20
                     bg-error/8 px-4 py-3 text-sm text-error"
        >
          <span className="mt-px text-base leading-none">⚠</span>
          {error}
        </div>
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
      {/* <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-email">Email Address</Label>

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
                placeholder="name@company.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="pl-11 pr-4"
              />
            )}
          />
        </div>

        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-error pl-1">
            {errors.email.message}
          </p>
        )}
      </div> */}

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

      {/* <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-primary transition-colors
                       hover:text-secondary"
          >
            Forgot password?
          </Link>
        </div>

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
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="pl-11 pr-12 "
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

        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="text-xs text-error pl-1"
          >
            {errors.password.message}
          </p>
        )}
      </div> */}

      {/* ── Submit ── */}
      <div>
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-1 h-12 w-full cursor-pointer rounded-xl
                   bg-linear-to-r from-primary to-secondary
                   text-sm font-bold text-on-primary
                   shadow-[0_8px_24px_rgba(163,166,255,0.25)]
                   transition-all duration-200
                   hover:shadow-[0_8px_32px_rgba(163,166,255,0.4)]
                   hover:brightness-110
                   active:scale-[0.98]
                   disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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
        </Button>
      </div>

      {/* ── Divider ── */}
      <div className="relative flex items-center py-1">
        <div
          className="grow border-t border-outline-variant/15"
          aria-hidden="true"
        />
        <span className="px-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60">
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
                       active:scale-[0.98]"
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
