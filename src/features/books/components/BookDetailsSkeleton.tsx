const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-xl bg-surface-container ${className ?? ""}`}
  />
);

const BookDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface">
      <div className="container w-full mx-auto py-8 px-4">
        <SkeletonBlock className="mb-8 h-4 w-32" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <SkeletonBlock className="aspect-3/4 w-full rounded-3xl" />
            <div className="mt-6 flex gap-4">
              <SkeletonBlock className="h-20 w-20 rounded-xl" />
              <SkeletonBlock className="h-20 w-20 rounded-xl" />
              <SkeletonBlock className="h-20 w-20 rounded-xl" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <SkeletonBlock className="mb-4 h-4 w-24" />
            <SkeletonBlock className="mb-2 h-14 w-3/4" />
            <SkeletonBlock className="mb-8 h-5 w-48" />

            <SkeletonBlock className="mb-6 h-20 w-full" />

            <SkeletonBlock className="mb-4 h-10 w-32" />
            <SkeletonBlock className="mb-10 h-6 w-56" />

            <div className="flex gap-4">
              <SkeletonBlock className="h-14 w-48 rounded-2xl" />
              <SkeletonBlock className="h-14 w-40 rounded-2xl" />
            </div>

            <div className="mt-16">
              <SkeletonBlock className="mb-6 h-4 w-32" />
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <SkeletonBlock className="h-16 rounded-xl" />
                <SkeletonBlock className="h-16 rounded-xl" />
                <SkeletonBlock className="h-16 rounded-xl" />
                <SkeletonBlock className="h-16 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
