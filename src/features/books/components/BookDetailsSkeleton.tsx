import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

const BookDetailsSkeleton = () => {
  return (
    <main className="flex-1 main-container">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 relative">
          <SkeletonBlock className="absolute -top-6 sm:-top-8 -translate-y-1/2 right-0 z-1 h-4 w-32" />
          <div className="lg:col-span-5">
            <SkeletonBlock className="aspect-3/4 w-full rounded-3xl" />
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <SkeletonBlock className="mb-4 h-4 w-24" />
                <SkeletonBlock className="mb-2 h-14 w-3/4" />
                <SkeletonBlock className="h-5 w-48" />
              </div>
              <SkeletonBlock className="size-14 shrink-0 rounded-full" />
            </div>

            <SkeletonBlock className="my-8 h-px w-full" />

            <SkeletonBlock className="mb-6 h-20 w-full" />

            <SkeletonBlock className="mb-4 h-10 w-32" />
            <SkeletonBlock className="mb-10 h-6 w-56" />

            <div className="flex gap-4">
              <SkeletonBlock className="h-14 w-52 rounded-lg" />
              <SkeletonBlock className="h-14 w-40 rounded-lg" />
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

        <section className="mt-24 border-t border-outline-variant/20 pt-12">
          <SkeletonBlock className="h-9 w-48" />
          <div className="mt-12 flex flex-col items-center rounded-3xl px-16 py-16 border border-outline-variant/10">
            <SkeletonBlock className="mb-6 size-16 rounded-full" />
            <SkeletonBlock className="mb-2 h-6 w-44" />
            <SkeletonBlock className="h-4 w-72" />
            <SkeletonBlock className="mt-8 h-5 w-32" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetailsSkeleton;
