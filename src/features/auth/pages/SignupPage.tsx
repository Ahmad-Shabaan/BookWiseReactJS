import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import BookWise from "@/assets/images/book-wise.png";
import type { SignupFormValues } from "../schemas/signup.schema";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRegister } from "../hooks/useRegister";

const SignupPage: React.FC = () => {
  const { isSigningUp, signup, signupError , errors } = useRegister();
  const handleSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!titleRef.current || !descriptionRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      const titleSplit = SplitText.create(titleRef.current, {
        type: "words",
        mask: "lines",
      });

      tl.from(titleSplit.words, {
        y: -120,
        opacity: 0,
        rotation: "random(-90, 90)",
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: 0.12,
      });

      const descSplit = SplitText.create(descriptionRef.current, {
        type: "words",
        mask: "lines",
      });

      tl.from(
        descSplit.words,
        {
          y: -60,
          opacity: 0,
          rotation: "random(-25, 25)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
        },
        "-=0.55",
      );

      tl.fromTo(
        "[data-animate='form'] > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
        },
        "-=0.45",
      );

      tl.fromTo(
        "[data-animate='image']",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6",
      );
      return () => {
        titleSplit.revert();
        descSplit.revert();
        tl.kill();
      };
    },
    { scope: containerRef },
  );
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
                ref={titleRef}
                className="text-2xl font-bold text-on-surface tracking-tight"
              >
                Create an account
              </h1>
              <p
                ref={descriptionRef}
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
              serverErrors={errors}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
