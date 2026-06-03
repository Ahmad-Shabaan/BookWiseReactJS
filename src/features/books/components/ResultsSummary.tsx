type ResultsSummaryProps = {
  isLoading: boolean;
  isFetching: boolean;
  totalPages?: number;
  totalCount?: number;
};
const ResultsSummary = (summary: ResultsSummaryProps) => {
  return (
    <div className="mb-5 flex items-center gap-3">
      <p className="text-sm text-on-surface-variant">
        Showing{" "}
        <strong className="text-on-surface">
          {summary.isLoading ? "…" : summary.totalPages}
        </strong>{" "}
        of{" "}
        <strong className="text-on-surface">
          {summary.isLoading ? "…" : summary?.totalCount}
        </strong>{" "}
        books
      </p>

      {summary.isFetching && !summary.isLoading && (
        <span
          aria-label="Updating results"
          className="
                    inline-block h-2 w-2 animate-pulse
                    rounded-full bg-primary/70
                  "
        />
      )}
    </div>
  );
};

export default ResultsSummary;
