import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import FieldWrapper from "./FieldWrapper";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../schemas/reset.password.schema";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import { Lock } from "lucide-react";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";
const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const {
    resetPassword,
    isResettingPassword,
    resetPasswordError,
    isResettingPasswordError,
  } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token || !userId) {
    return (
      <AppError
        message="Invalid password reset link. Please request a new one.⚠"
        to="/forget-password"
        link="Request New Link"
      />
    );
  }
  const submitHandler = (data: ResetPasswordSchema) =>
    resetPassword(userId, token, data.password);

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-5 w-full mt-4"
      noValidate
      data-animate="form"
    >
      {/* ── Server error ── */}
      {isResettingPasswordError && (
        <ErrorMessage msg={resetPasswordError} className="w-[90%] max-w-100" />
      )}

      {/* ── Password ── */}
      <FieldWrapper
        id="reset-password"
        label="New Password"
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
                id="reset-password"
                type="password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* ── Confirm Password ── */}
      <FieldWrapper
        id="confirm-password"
        label="Confirm New Password"
        errorId="confirm-password-error"
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
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                className="pl-11 pr-4"
              />
            )}
          />
        </div>
      </FieldWrapper>

      {/* ── Submit ── */}
      <div>
        <button
          type="submit"
          disabled={isResettingPassword}
          className="btn-primary mt-1 tracking-normal font-semibold"
        >
          {isResettingPassword ? (
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-full border-2 border-on-primary/30
                             border-t-on-primary animate-spin"
              />
              Resetting password…
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
