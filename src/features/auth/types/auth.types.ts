import type { SignupFormValues } from "../schemas/signup.schema";

export interface User {
  userId: string;
  displayName: string;
  email: string;
}

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
  isSignupError?: boolean;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
  isLoginError?: boolean;
}
