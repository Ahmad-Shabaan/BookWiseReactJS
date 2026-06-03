const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-surface-container ${className ?? ""}`} />
);

const ShoppingCartSkeleton = () => {
  return (
    <main className="min-h-dvh bg-surface font-sans text-on-surface pt-24 main-container">
      <section className="container w-full mx-auto px-4 page-container">
        <div className="flex items-start gap-6 flex-col md:flex-row">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 mb-6 w-full bg-surface-container-low rounded-xl p-4 sm:p-6 ">
              <SkeletonBlock className="icon-card" />
              <SkeletonBlock className="h-8 w-40" />
            </div>
            <div className="flex flex-col gap-4 items-start flex-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-surface-container-low"
                >
                  <SkeletonBlock className="w-full sm:w-32 aspect-2/3 rounded-lg shrink-0" />
                  <div className="flex flex-col flex-1 justify-between py-2 gap-4">
                    <div className="space-y-3">
                      <SkeletonBlock className="h-6 w-3/4" />
                      <SkeletonBlock className="h-4 w-1/3" />
                      <SkeletonBlock className="h-7 w-24" />
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/15">
                      <div className="flex items-center gap-4 bg-surface-container-high rounded-lg px-2 py-1">
                        <SkeletonBlock className="size-6 rounded" />
                        <SkeletonBlock className="h-4 w-6" />
                        <SkeletonBlock className="size-6 rounded" />
                      </div>
                      <SkeletonBlock className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-96 lg:w-md shrink-0">
            <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
              <SkeletonBlock className="h-7 w-36" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <SkeletonBlock className="w-16 h-24 rounded shrink-0" />
                    <div className="grow space-y-2">
                      <SkeletonBlock className="h-4 w-3/4" />
                      <SkeletonBlock className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-container-high pt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-3 w-14" />
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-container-high pt-4 flex justify-between items-end">
                <SkeletonBlock className="h-4 w-14" />
                <SkeletonBlock className="h-7 w-24" />
              </div>
              <SkeletonBlock className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShoppingCartSkeleton;
