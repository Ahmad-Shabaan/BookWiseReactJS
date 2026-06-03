import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useLoginFormAnimation } from "../animations/form.animation";

const AuthLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLoginFormAnimation({ sectionRef: containerRef });
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
