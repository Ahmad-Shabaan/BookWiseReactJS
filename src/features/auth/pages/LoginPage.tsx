import Logo from "@/shared/components/common/Logo";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
export default function LoginPage() {
  const { login, isLoggingIn, loginError, isLoginError } = useAuth();
  return (
    <div className=" flex flex-col items-center lg:items-start">
      <div data-animate="brand-mobile" className=" lg:hidden flex-center mb-6">
        <Logo className="size-12" />
      </div>
      {/* md:pl-2 */}
      <div
        className="w-full  lg:pl-6  flex flex-col items-center lg:items-start xl:max-w-lg"
        data-animate="card"
      >
        <section
          data-animate="header"
          className="flex items-center lg:items-start justify-center flex-col"

          // className="space-y-1 mb-6 flex items-center lg:items-start justify-center flex-col"
        >
          <h1 className="section-header sm:text-3xl">Welcome back!</h1>
          <p className="section-description max-w-full">
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
