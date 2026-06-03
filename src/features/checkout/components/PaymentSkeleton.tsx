const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-surface-container ${className ?? ""}`} />
);

const PaymentSkeleton = () => {
  return (
    <main className="main-container">
      <section className="page-container">
        <div className="relative mb-10 sm:mb-16">
          <div className="flex justify-between w-full max-w-2xl mx-auto px-0 sm:px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 sm:gap-3">
                <SkeletonBlock className="size-7 sm:size-10 rounded-full" />
                <SkeletonBlock className="h-2.5 w-14 sm:w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          <div className="w-full lg:w-2/3 space-y-8 sm:space-y-12">
            <section className="bg-surface-container-low rounded-xl p-5 sm:p-8 lg:p-12">
              <SkeletonBlock className="h-7 w-52 mb-8" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <SkeletonBlock className="h-3 w-28" />
                  <SkeletonBlock className="h-12 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <SkeletonBlock className="h-3 w-32" />
                  <SkeletonBlock className="h-12 w-full rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <SkeletonBlock className="h-3 w-12" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-24" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-16" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-36" />
                    <SkeletonBlock className="h-12 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-5 sm:p-8 lg:p-12">
              <SkeletonBlock className="h-7 w-44 mb-6 sm:mb-8" />
              <div className="space-y-3 sm:space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-4 sm:p-6 rounded-xl bg-surface-container">
                    <div className="flex items-center gap-4">
                      <SkeletonBlock className="size-6 rounded-full" />
                      <div className="space-y-2">
                        <SkeletonBlock className="h-4 w-28" />
                        <SkeletonBlock className="h-3 w-36" />
                      </div>
                    </div>
                    <SkeletonBlock className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-surface-container-low rounded-xl p-5 sm:p-8">
              <SkeletonBlock className="h-7 w-36 mb-8" />
              <div className="space-y-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <SkeletonBlock className="w-16 h-24 rounded shrink-0" />
                    <div className="grow space-y-2">
                      <SkeletonBlock className="h-4 w-3/4" />
                      <SkeletonBlock className="h-3 w-1/2" />
                      <SkeletonBlock className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 py-5 border-t border-surface-container-high">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <SkeletonBlock className="h-3 w-24" />
                    <SkeletonBlock className="h-3 w-14" />
                  </div>
                ))}
              </div>
              <div className="pt-5 mt-1 border-t border-surface-container-high">
                <div className="flex justify-between items-end mb-6">
                  <SkeletonBlock className="h-4 w-14" />
                  <SkeletonBlock className="h-7 w-24" />
                </div>
              </div>
              <SkeletonBlock className="h-12 w-full rounded-lg mb-3" />
              <SkeletonBlock className="h-12 w-full rounded-lg" />

              <div className="mt-6 flex justify-center">
                <SkeletonBlock className="h-3 w-40" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentSkeleton;
