import type { SignupFormValues } from "../schemas/signup.schema";

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void> | void;
  isLoading?: boolean;
  error?: string | null;
  serverErrors?: string[] | null;
}
