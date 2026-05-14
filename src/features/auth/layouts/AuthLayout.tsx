import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-animate='orb']",
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.12 },
      )
        .fromTo(
          "[data-animate='brand']",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.55",
        )
        // .fromTo(
        //   "[data-animate='card']",
        //   { opacity: 0, y: 40 },
        //   { opacity: 1, y: 0, duration: 0.7 },
        //   "-=0.7",
        // )
        .fromTo(
          "[data-animate='header'] > *",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          "[data-animate='form'] > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.45",
        );
      return () => {
        tl.kill();
      };
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="relative min-h-svh bg-background text-on-surface selection:bg-primary selection:text-on-primary"
    >
      {/* ── Atmospheric Orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          data-animate="orb"
          className="absolute -left-[15%] -top-[15%] h-[55%] w-[55%] rounded-full bg-primary/15 blur-[140px]"
        />
        <div
          data-animate="orb"
          className="absolute -right-[10%] top-[15%] h-[40%] w-[40%] rounded-full bg-secondary/10 blur-[120px]"
        />
        <div
          data-animate="orb"
          className="absolute bottom-[-5%] left-[30%] h-[35%] w-[35%] rounded-full bg-tertiary/8 blur-[160px]"
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="relative z-10 grid min-h-svh lg:grid-cols-2">
        {/* ── LEFT PANEL (desktop only) ── */}
        <div
          data-animate="brand"
          className="hidden lg:flex flex-col justify-between px-16 py-14
            bg-surface-container-low border-r border-outline"
        >
          {/* Logo */}
          <span className="text-gradient font-modern-negra text-4xl tracking-tight">
            Book Wise
          </span>

          {/* Center copy */}
          <div className="space-y-6 max-w-md">
            <h2 className="text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-on-surface">
              Your reading
              <br />
              <span className="text-gradient">life, organized.</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Track every book, discover your next favourite, and share what
              you're reading with the world.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 pt-4">
              {[
                { value: "2M+", label: "Readers" },
                { value: "8M+", label: "Books tracked" },
                { value: "4.9★", label: "App rating" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-primary">{value}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="glass-panel rounded-2xl p-6 mt-1 max-w-sm">
            <p className="text-sm text-on-surface-variant leading-relaxed italic">
              "Book Wise completely changed how I approach reading. I've read
              more this year than the last five combined."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/30 flex-center text-xs font-bold text-primary">
                S
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Sarah K.</p>
                <p className="text-xs text-on-surface-variant">
                  Verified reader
                </p>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
