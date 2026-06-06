import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

const BasketSkeleton = () => {
  return (
    <main className="flex-1 main-container">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -top-6 sm:-top-8 -translate-y-1/2 right-0 z-1">
                <SkeletonBlock className="h-4 w-36" />
              </div>
              <section className="bg-surface-container-low rounded-xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-soft border border-outline-variant/10 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-6 z-10">
                  <SkeletonBlock className="size-14 rounded-xl" />
                  <div className="space-y-2">
                    <SkeletonBlock className="h-8 w-36" />
                  </div>
                </div>
              </section>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <div className="flex flex-col gap-4 items-start flex-1 sm:max-h-dvh sm:overflow-y-scroll hide-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full shadow-soft flex flex-col sm:flex-row gap-6 p-3 sm:p-4 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container"
                  >
                    <SkeletonBlock className="w-full sm:size-40 aspect sm:aspect-2/3 rounded-lg shrink-0 shadow-soft-dim" />
                    <div className="flex flex-col flex-1 justify-between py-2 gap-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-end sm:items-start space-y-1">
                        <div className="space-y-1 w-full">
                          <SkeletonBlock className="h-6 w-3/4" />
                          <SkeletonBlock className="h-4 w-1/3" />
                        </div>
                        <SkeletonBlock className="h-7 w-24 sm:ml-4 shrink-0" />
                      </div>
                      <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/15">
                        <SkeletonBlock className="h-8 w-30 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="col-span-1 flex flex-col gap-6">
            <section className="aside-section">
              <div className="aside-section-blur" />
              <SkeletonBlock className="aside-header h-6 w-36 mb-8" />
              <div className="mb-8">
                <SkeletonBlock className="h-4 w-28 mb-2" />
                <SkeletonBlock className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <SkeletonBlock className="h-3 w-24" />
                    <SkeletonBlock className="h-3 w-14" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-outline-variant/15 mb-8">
                <SkeletonBlock className="h-4 w-14" />
                <SkeletonBlock className="h-7 w-24" />
              </div>
              <SkeletonBlock className="h-12 w-full rounded-lg" />
              <div className="mt-6 flex justify-center">
                <SkeletonBlock className="h-3 w-40" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BasketSkeleton;
