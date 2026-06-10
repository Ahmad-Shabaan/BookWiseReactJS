import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Mail } from "lucide-react";
// import {
//   forgetPasswordSchema,
//   type ForgetPasswordSchema,
// } from "../schemas/forget.password.schema";
import FieldWrapper from "./FieldWrapper";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";
import {
  forgetPasswordSchema,
  type ForgetPasswordSchema,
} from "@/lib/utils/validation";
const ForgetPasswordForm = () => {
  const {
    forgetPassword,
    isForgettingPassword,
    forgetPasswordError,
    isForgettingPasswordError,
  } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: "" },
  });

  const submitHandler = (data: ForgetPasswordSchema) =>
    forgetPassword(data.email);

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 sm:gap-6 w-full "
      noValidate
      data-animate="form"
    >
      {/* ── Server error ── */}
      {isForgettingPasswordError && <ErrorMessage msg={forgetPasswordError} />}

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

      {/* ── Submit ── */}
      <div>
        <button
          type="submit"
          disabled={isForgettingPassword}
          className="btn-primary mt-1 tracking-normal font-semibold"
        >
          {isForgettingPassword ? (
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-full border-2 border-on-primary/30
                             border-t-on-primary animate-spin"
              />
              Sending reset link…
            </span>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
