import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
export default function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth();
  return (
      <AuthCard greeting="Welcome back!" message="Sign in to continue your reading journey.">
        <LoginForm onSubmit={login} isLoading={isLoggingIn} error={loginError} />
      </AuthCard>
  );
}
