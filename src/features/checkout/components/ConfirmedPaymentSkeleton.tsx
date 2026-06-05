import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

const ConfirmedPaymentSkeleton = () => {
  return (
    <div className="relative flex-1 flex-center pt-12 sm:pt-14 lg:pt-16 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[150px]" />
      </div>
      <section className="relative w-full max-w-2xl col-center py-4 text-center space-y-4 sm:space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl" />
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-surface-container-highest flex items-center justify-center shadow-soft border border-outline-variant/15">
            <SkeletonBlock className="size-8 sm:size-12 rounded-full" />
          </div>
        </div>
        <div className="col-center">
          <SkeletonBlock className="h-8 sm:h-10 w-56 mb-3" />
          <SkeletonBlock className="h-4 w-72 sm:w-80" />
        </div>
        <div className="w-auto glass-panel rounded-2xl p-8 sm:px-16 shadow-soft flex gap-4 sm:gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          <div className="z-10">
            <SkeletonBlock className="h-3 w-24 mb-2" />
            <SkeletonBlock className="h-7 w-36" />
          </div>
          <div className="block w-px h-16 bg-outline-variant/15 z-10" />
          <div className="z-10">
            <SkeletonBlock className="h-3 w-28 mb-2" />
            <SkeletonBlock className="h-8 sm:h-9 w-28" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
          <SkeletonBlock className="h-12 w-44 rounded-lg" />
          <SkeletonBlock className="h-12 w-48 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default ConfirmedPaymentSkeleton;
