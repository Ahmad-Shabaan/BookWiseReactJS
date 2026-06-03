const STEPS = ["Shipping", "Payment", "Review"] as const;

interface ProgressPaymentProps {
  currentStep?: number;
}

const ProgressPayment = ({ currentStep = 1 }: ProgressPaymentProps) => {
  return (
    <div className="relative mb-10 sm:mb-16">
      <div className="absolute top-3 sm:top-5 left-0 w-full h-0.5 bg-surface-container-high -z-10 rounded-full" />
      <div
        className="absolute top-3 sm:top-5 left-0 h-0.5 bg-primary -z-10 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
      />
      <div className="flex justify-between w-full max-w-2xl mx-auto px-0 sm:px-4 relative overflow-hidden">
        <div className="w-[calc(100%-80px)] sm:w-[calc(100%-100px)]  h-[0.5px] bg-primary absolute top-3.5 sm:top-5 left-10 translate-y-1/2" />
        {STEPS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 sm:gap-3"
            >
              <div
                className={`relative size-7 sm:size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted || isActive
                    ? "bg-primary shadow-[0_0_12px_rgba(163,166,255,0.4)_sm:shadow-[0_0_20px_rgba(163,166,255,0.4)]"
                    : "bg-surface-container-highest border border-outline-variant/15"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="size-3.5 sm:size-5 text-on-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      isActive ? "text-on-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
              </div>
              <span
                className={`text-xs sm:text-sm uppercase tracking-widest font-label whitespace-nowrap ${
                  isCompleted || isActive
                    ? "text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressPayment;
