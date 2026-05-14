import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../services/authApi";
import axios from "axios";
import type { SignupFormValues } from "../schemas/signup.schema";

export function useRegister() {
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      console.log("Signup successful, redirecting to login...");
      navigate("/login", { replace: true });
    },
  });

  return {
    signup: (values: SignupFormValues) => signupMutation.mutate(values),
    isSigningUp: signupMutation.isPending,
    signupError: axios.isAxiosError(signupMutation.error)
      ? (signupMutation.error.response?.data?.message ??
        signupMutation.error.message)
      : null,
    errors: axios.isAxiosError(signupMutation.error)
      ? signupMutation.error.response?.data?.errors 
      : null,
  };
}
