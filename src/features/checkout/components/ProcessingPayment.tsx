import { Check, Lock, ShieldCheck } from "lucide-react";
const STEPS = [
  "Encrypted Connection",
  "Verifying Card Details",
  "Finalizing Order",
];
const ProcessingPayment = () => {
  return (
    <main className="main-container">
      <section className="page-container py-0">
        <div className=" flex items-center justify-center relative overflow-hidden">
          <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 1; }
          80%, 100% { opacity: 0; }
        }
        @keyframes pulse-dot {
          0% { transform: scale(0.8); }
          50% { transform: scale(1); }
          100% { transform: scale(0.8); }
        }
      `}</style>

          {/* Tonal background transition */}
          <div className="absolute inset-0 bg-surface" />
          {/* bg-[radial-gradient(circle_at_50%_50%,#1a1f2e_0%,#0a0e19_100%)] */}
          {/* Atmospheric orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-xl px-6">
            <div className="rounded-xl p-12 text-center flex flex-col items-center gap-8 shadow-soft glass-panel border-outline-variant/15">
              {/* Custom Cinematic Loading Animation */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer pulsating rings */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-[pulse-ring_2s_cubic-bezier(0.455,0.03,0.515,0.955)_infinite]" />
                <div
                  className="absolute inset-4 rounded-full bg-secondary/20 animate-[pulse-ring_2s_cubic-bezier(0.455,0.03,0.515,0.955)_infinite]"
                  style={{ animationDelay: "-0.5s" }}
                />

                {/* Core orbital ring 1 */}
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_3s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#a3a6ff]" />
                </div>

                {/* Core orbital ring 2 */}
                <div className="absolute inset-6 border-2 border-secondary/30 rounded-full animate-[spin_2s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_15px_#c180ff]" />
                </div>

                {/* Inner glow dot */}
                <div className="w-4 h-4 bg-on-background rounded-full animate-[pulse-dot_2s_cubic-bezier(0.455,0.03,0.515,0.955)_infinite] shadow-[0_0_20px_#e8eafb]" />
              </div>

              {/* Textual Hierarchy */}
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-lg sm:text-3xl md:text-4xl font-bold tracking-tight text-on-background">
                  Securing your transaction...
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-base max-w-sm mx-auto leading-normal sm:leading-relaxed">
                  Processing payment, please do not refresh or close your
                  browser. This will only take a moment.
                </p>
              </div>

              {/* Status Progress Labels */}
              <div className="w-full flex flex-col gap-3 pt-4 border-t border-outline-variant/10">
                {STEPS.map((label, i) => {
                  const isCompleted = i < 2;
                  const isActive = i === 2;

                  return (
                    <div
                      key={label}
                      className={`flex justify-between items-center px-4 ${
                        !isCompleted && !isActive ? "opacity-40" : ""
                      }`}
                    >
                      <span
                        className={`text-xs sm:uppercase sm:tracking-widest sm:font-bold ${
                          isCompleted
                            ? "text-primary"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {label}
                      </span>

                      {isCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-on-primary"
                            strokeWidth={3}
                          />
                        </div>
                      ) : isActive ? (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 bg-outline-variant rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Security badges */}
            <div className="mt-8 flex justify-center items-center gap-6 text-on-surface-variant/60 text-xs uppercase tracking-widest font-semibold">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" aria-hidden />
                <span>SSL SECURED</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                <span>PCI COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProcessingPayment;
