import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import BookWise from "@/assets/images/book-wise.png";
import { useRegister } from "../hooks/useRegister";
import { useSignupFormAnimation } from "../animations/form.animation";
import Logo from "@/shared/components/common/Logo";
import type { SignupFormValues } from "@/lib/utils/validation";

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
      <div className="page-container flex-center">
        <div className="w-full sm:max-w-xl flex flex-col gap-4 sm:gap-6 items-center lg:items-start ">
          <Logo className="size-12" />
          
          <section className="col-center lg:items-start">
            <h1 data-animate="header" className="section-header sm:text-3xl">
              Create an account
            </h1>
            <p
              data-animate="paragraph"
              className="split section-description max-w-full"
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
          className="hidden lg:inline-block object-cover lg:h-278"
        />
      </div>
    </main>
  );
};

export default SignupPage;
