import { ArrowLeft, GlobeLockIcon } from "lucide-react";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <main className="main-container pt-0">
      <section className="page-container flex-center h-dvh ">
        <div className="aside-section w-fit px-6 py-8 flex flex-col items-center gap-6">
          <div className="rounded-full bg-surface-variant p-4">
            <GlobeLockIcon className="size-6 text-primary" />
          </div>
          <h1 className="aside-header text-3xl mb-0">Forgot password?</h1>
          <p className="text-center text-on-surface-variant w-[90%] max-w-100">
            No worries, it happens. Enter your email and we'll send you reset
            instructions.
          </p>
          {/*    Enter your email address and we'll send you a link to reset your password." */}
          <ForgetPasswordForm />

          <Link
            to="/login"
            className=" inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ForgetPassword;
