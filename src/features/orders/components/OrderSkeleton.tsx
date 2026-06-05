import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

const OrderSkeleton = () => {
  return (
    <main className="flex-1 main-container">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-6">
              <SkeletonBlock className="size-14 rounded-xl" />
              <div className="space-y-2 flex-1">
                <SkeletonBlock className="h-7 w-48" />
                <SkeletonBlock className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-6 w-24 rounded-full" />
                <SkeletonBlock className="h-6 w-20 rounded-full" />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-outline-variant/15">
                <SkeletonBlock className="h-6 w-44" />
                <SkeletonBlock className="h-5 w-16 rounded-md" />
              </div>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-3 sm:p-4 rounded-lg bg-surface-container/50"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <SkeletonBlock className="size-24 rounded-lg shrink-0" />
                      <div className="space-y-2 flex-1">
                        <SkeletonBlock className="h-5 w-3/4" />
                        <SkeletonBlock className="h-4 w-28" />
                        <SkeletonBlock className="h-5 w-14 rounded mt-2" />
                      </div>
                    </div>
                    <SkeletonBlock className="h-6 w-24 self-end sm:self-center" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="col-span-1 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <SkeletonBlock className="h-5 w-36 mb-6" />
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-16" />
                  <SkeletonBlock className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-16" />
                  <SkeletonBlock className="h-4 w-20" />
                </div>
              </div>
              <div className="flex justify-between pt-6 border-t border-outline-variant/15">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-5 w-24" />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <SkeletonBlock className="h-5 w-40 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <SkeletonBlock className="h-3 w-12" />
                    <SkeletonBlock className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderSkeleton;