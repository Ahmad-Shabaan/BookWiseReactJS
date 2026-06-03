const SkeletonBlock = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <div
    className={`animate-pulse rounded bg-surface-container-highest/60 ${className ?? ""}`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const COLUMNS = Array.from({ length: 5 }, (_, i) => ({ key: i }));

const OrdersSkeleton = () => {
  return (
    <section className="min-h-screen bg-surface font-sans text-on-background pt-20">
      <div className="page-container">
        <div className="mb-10 animate-in fade-in duration-700">
          <SkeletonBlock className="h-9 w-48" />
          <div className="mt-2.5 flex items-center gap-2">
            <SkeletonBlock className="h-4 w-64" delay={0.05} />
          </div>
        </div>
        <div className="hide-scrollbar rounded-xl bg-surface-container-low shadow-soft border border-outline-variant/10 overflow-hidden">
          <div className="flex items-center gap-3 bg-surface-container px-6 h-12 border-b border-outline-variant/5 animate-in fade-in duration-700">
            {COLUMNS.map((col, i) => (
              <div
                key={col.key}
                className="flex-1 flex items-center justify-center first:justify-start last:justify-end"
              >
                <SkeletonBlock className="h-3 w-16" delay={0.02 + i * 0.03} />
              </div>
            ))}
          </div>
          <div className="animate-in fade-in duration-700">
            {Array.from({ length: 5 }, (_, i) => {
              const rowDelay = 0.1 + i * 0.06;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/5 last:border-b-0 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                >
                  <div className="flex-1 flex items-center justify-center first:justify-start last:justify-end">
                    <SkeletonBlock
                      className="h-8 w-28 rounded-md"
                      delay={rowDelay}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center first:justify-start last:justify-end">
                    <SkeletonBlock
                      className="h-8 w-28 rounded-md"
                      delay={rowDelay + 0.03}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center first:justify-start last:justify-end">
                    <SkeletonBlock
                      className="h-8 w-28 rounded-md"
                      delay={rowDelay + 0.06}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center first:justify-start last:justify-end">
                    <SkeletonBlock
                      className="h-8 w-28 rounded-md"
                      delay={rowDelay + 0.09}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center first:justify-start last:justify-end">
                    <SkeletonBlock
                      className="h-8 w-28 rounded-md"
                      delay={rowDelay + 0.12}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-outline-variant/30 to-transparent" />
          <div className="flex items-center justify-between px-6 py-4 animate-in fade-in duration-700">
            <SkeletonBlock className="h-3 w-24" delay={0.02} />
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-9 w-9 rounded-lg" delay={0.04} />
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <SkeletonBlock
                    key={i}
                    className="h-9 w-9 rounded-lg"
                    delay={0.06 + i * 0.04}
                  />
                ))}
              </div>
              <SkeletonBlock className="h-9 w-9 rounded-lg" delay={0.1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersSkeleton;
