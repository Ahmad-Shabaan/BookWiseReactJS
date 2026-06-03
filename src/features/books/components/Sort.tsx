import { useSearchParams } from "react-router-dom";
const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "PriceAsc" },
  { label: "Price: High to Low", value: "PriceDesc" },
  { label: "Publication Year: Low to High", value: "PublicationYearAsc" },
  { label: "Publication Year: High to Low", value: "PublicationYearDesc" },
  { label: "Available Copies: Low to High", value: "AvailableCopiesAsc" },
  { label: "Available Copies: High to Low", value: "AvailableCopiesDesc" },
  { label: "Name", value: "name" },
];
const BookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get("sort") ?? undefined;

  const updateSort = (value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) next.delete("sort");
    else next.set("sort", value);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };
  const clearSort = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("sort");
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      data-anim="controls"
      className="flex items-center gap-3"
      role="group"
      aria-label="Sort options"
    >
      <section className="flex flex-wrap gap-2 p-2 shadow-soft">
        <button
          onClick={() => clearSort()}
          aria-pressed={!sortOption}
          className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    !sortOption
                      ? "bg-linear-to-br from-primary to-secondary text-on-primary shadow-[0_0_12px_rgba(163,166,255,0.35)]"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }
                `}
        >
          All
        </button>
        {SORT_OPTIONS.map((opt) => {
          const active = sortOption === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => updateSort(active ? null : opt.value)}
              aria-pressed={active}
              className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    active
                      ? "bg-linear-to-br from-primary to-secondary text-on-primary shadow-[0_0_12px_rgba(163,166,255,0.35)]"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }
                `}
            >
              {opt.label}
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default BookSearch;
