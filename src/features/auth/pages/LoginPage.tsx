import Logo from "@/shared/components/common/Logo";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
export default function LoginPage() {
  const { login, isLoggingIn, loginError, isLoginError } = useAuth();
  return (
    <div className=" flex flex-col items-center md:items-start">
      <div className=" md:hidden flex-center mb-6">
        <Logo className="size-12" />
      </div>
      <div
        className="w-full md:pl-2 lg:pl-6  flex flex-col items-center md:items-start"
        data-animate="card"
      >
        <section
          data-animate="header"
          className="space-y-1 mb-6 flex items-center md:items-start justify-center flex-col"
        >
          <h1 className="text-3xl font-black tracking-tight">Welcome back!</h1>
          <p className="text-on-surface-variant">
            Sign in to continue your reading journey.
          </p>
        </section>
        {/* Form */}
        <LoginForm
          onSubmit={login}
          isLoading={isLoggingIn}
          error={loginError}
          isLoginError={isLoginError}
        />
      </div>
    </div>
  );
}
