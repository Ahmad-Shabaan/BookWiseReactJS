import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import BookWise from "@/assets/images/book-wise.png";
import type { SignupFormValues } from "../schemas/signup.schema";
import { useRegister } from "../hooks/useRegister";
import { useSignupFormAnimation } from "../animations/form.animation";
import Logo from "@/shared/components/common/Logo";

const SignupPage: React.FC = () => {
  const { isSigningUp, signup, signupError, isSignupError } = useRegister();
  const handleSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useSignupFormAnimation({ sectionRef: containerRef });
  return (
    <main
      ref={containerRef}
      className="main-container pt-0 min-h-svh flex items-start sm:items-center justify-center"
    >
      <div className="page-container grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 place-content-center">
        <div className="w-full flex flex-col gap-6 col-span-2 2xl:col-span-2 2xl:col-start-2 items-center md:items-start">
          <Logo className="size-12"/>
          <section className="flex flex-col items-center md:items-start gap-1">
            <h1
              data-animate="header"
              className="text-2xl font-bold text-on-surface tracking-tight"
            >
              Create an account
            </h1>
            <p
              data-animate="paragraph"
              className="split text-sm text-on-surface-variant leading-relaxed"
            >
              Fill in your details below to get started in seconds.
            </p>
          </section>

          {/* ── Form card ── */}
          <SignupForm
            onSubmit={handleSubmit}
            isLoading={isSigningUp}
            error={signupError}
            isSignupError={isSignupError}
          />
        </div>
        <img
          data-animate="image"
          src={BookWise}
          alt="Bookshelf background"
          aria-hidden="true"
          className="hidden lg:inline-block object-cover max-h-272 col-span-1"
        />
      </div>
    </main>
  );
};

export default SignupPage;
