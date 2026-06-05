import { Link } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  return (
    <main className="main-container pt-0  min-h-svh">
      <div className="page-container flex-center h-dvh">
        <section className="aside-section w-fit px-6 py-8 flex flex-col items-center gap-6">
          <h1 className="aside-header text-3xl mb-0">Set New Password</h1>
          <p className="text-center text-on-surface-variant w-[90%] max-w-100">
            Your new password must be different from previous used passwords.
          </p>
          <ResetPasswordForm />
          <Link
            to="/login"
            className=" inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Login
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ResetPassword;
