import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import BookWise from "@/assets/images/book-wise.png";
import type { SignupFormValues } from "../schemas/signup.schema";
import { useRegister } from "../hooks/useRegister";
import { useSignupFormAnimation } from "../animations/form.animation";

const SignupPage: React.FC = () => {
  const { isSigningUp, signup, signupError, isSignupError } = useRegister();
  const handleSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useSignupFormAnimation({ sectionRef: containerRef });
  return (
    <div ref={containerRef}>
      {/* ── Fixed decorative image (right side, lg+) ── */}
      <img
        data-animate="image"
        src={BookWise}
        alt="Bookshelf background"
        aria-hidden="true"
        className="hidden lg:block fixed right-0 top-0 h-dvh w-auto object-cover -z-10 pointer-events-none select-none"
      />

      {/* ── Scrollable page content ── */}
      <div className="min-h-dvh flex flex-col">
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-10 lg:py-14">
          {/* Inner layout — form takes left ~60% on lg, image occupies the rest */}
          <div className="lg:w-[58%] xl:w-[52%] flex flex-col gap-8">
            {/* ── Page header — same typographic scale as LoginForm context ── */}
            <div className="flex flex-col gap-1.5">
              <h1
                data-animate="header"
                // ref={titleRef}
                className="text-2xl font-bold text-on-surface tracking-tight"
              >
                Create an account
              </h1>
              <p
                data-animate="paragraph"
                // ref={descriptionRef}
                className="split text-sm text-on-surface-variant leading-relaxed"
              >
                Fill in your details below to get started in seconds.
              </p>
            </div>

            {/* ── Form card ── */}
            <SignupForm
              onSubmit={handleSubmit}
              isLoading={isSigningUp}
              error={signupError}
              isSignupError={isSignupError}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
