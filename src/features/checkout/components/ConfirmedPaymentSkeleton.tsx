const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded bg-surface-container ${className ?? ""}`}
  />
);

const ConfirmedPaymentSkeleton = () => {
  return (
    <main className="main-container">
      <section className="page-container py-0">
        <div className="relative min-h-dvh flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[150px]" />
          </div>
          <div className="relative w-full max-w-2xl flex flex-col items-center text-center space-y-6">
            <div className="mb-10 relative group">
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-surface-container-highest flex items-center justify-center shadow-soft border border-outline-variant/15"></div>
            </div>
            <SkeletonBlock className="h-8 w-50" />
            <SkeletonBlock className="h-4 w-64" />
            <div className="w-full glass-panel rounded-2xl p-8 shadow-soft flex flex-col md:flex-row justify-around items-center gap-4 md:gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
              <div className="flex justify-center items-center gap-2 flex-col z-10">
                <SkeletonBlock className="h-6 w-40" />
                <SkeletonBlock className="h-6 w-24" />
              </div>
              <div className="hidden md:block w-px h-16 bg-outline-variant/15 z-10" />
              <div className="block md:hidden w-16 h-px bg-outline-variant/15 z-10" />
              <div className="flex justify-center items-center gap-2 flex-col z-10">
                <SkeletonBlock className="h-6 w-40" />
                <SkeletonBlock className="h-6 w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmedPaymentSkeleton;
