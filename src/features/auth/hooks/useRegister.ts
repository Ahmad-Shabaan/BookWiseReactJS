import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../services/authApi";
import type { SignupFormValues } from "../schemas/signup.schema";
import { handleErrorMessage } from "../utils/authHelpers";

export function useRegister() {
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return {
    signup: (values: SignupFormValues) => signupMutation.mutate(values),
    isSigningUp: signupMutation.isPending,
    signupError: handleErrorMessage(signupMutation.error),
    isSignupError: !!signupMutation.error,
  };
}
