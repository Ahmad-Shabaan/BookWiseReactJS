import { useSearchParams } from "react-router-dom";
import { useAuthors, useCategories } from "../hooks/useBooks";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";
import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";
// const clamp = (v: number, min: number, max: number) =>
// Math.min(Math.max(v, min), max);
// const CURRENT_YEAR = new Date().getFullYear();

// ── Section wrapper ───────────────────────────────────────────────────────────
const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className=" w-full p-1 shadow-soft">
    <span className="mb-4 block text-base text-primary">{title}</span>
    {children}
  </div>
);

// ── FilterSidebar ─────────────────────────────────────────────────────────────
const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = Number(searchParams.get("category") ?? undefined);
  const author = Number(searchParams.get("author") ?? undefined);
  // const genre = searchParams.get("genre") ?? undefined;
  // const rating = Number(searchParams.get("rating") ?? 1);
  // const yearFrom = Number(searchParams.get("yearFrom") ?? 1900);
  // const yearTo = Number(searchParams.get("yearTo") ?? CURRENT_YEAR);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();
  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useAuthors();

  const updateParam = (key: string, value: string | number | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === null) next.delete(key);
    else next.set(key, String(value));
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const clearFilter = (q: string) => {
    const next = new URLSearchParams(searchParams);
    next.delete(q);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  if (isCategoriesLoading || isAuthorsLoading)
    return (
      <div>
        <div className="animate-pulse h-4 bg-surface-container rounded w-1/3 mb-4" />
        <div className="flex flex-wrap gap-2 p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonBlock className="w-22 h-8 rounded-full" key={i} />
          ))}
        </div>
      </div>
    );
  if (isCategoriesError || isAuthorsError) return <ErrorMessage />;
  // const ratingPercent = ((rating - 1) / 4) * 100;
  return (
    <div aria-label="Book filters" className="w-full space-y-4 ">
      {/* ── Categories ───────────────────────────────────────────────────── */}
      <FilterSection title="Categories">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => clearFilter("category")}
            aria-pressed={!category}
            className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    !category
                      ? "bg-linear-to-br from-primary to-secondary text-on-primary shadow-[0_0_12px_rgba(163,166,255,0.35)]"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }
                `}
          >
            All
          </button>
          {categories?.map((opt) => {
            const active = category === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateParam("category", active ? null : opt.id)}
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
                {opt.name}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* ── Authors ───────────────────────────────────────────────────── */}
      <FilterSection title="Authors">
        <div className="flex flex-wrap gap-2 p-2">
          <button
            onClick={() => clearFilter("author")}
            aria-pressed={!author}
            className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    !author
                      ? "bg-linear-to-br from-primary to-secondary text-on-primary shadow-[0_0_12px_rgba(163,166,255,0.35)]"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }
                `}
          >
            All
          </button>
          {authors?.map((opt) => {
            const active = author === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateParam("author", active ? null : opt.id)}
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
                {opt.name}
              </button>
            );
          })}
        </div>
      </FilterSection>
      {/* ── Genres ────────────────────────────────────────────────────── */}
      {/* <FilterSection title="Genres">
        <div className="flex flex-wrap gap-2 p-2">
          <button
            onClick={() => clearFilter("genre")}
            aria-pressed={!genre}
            className={`
                  rounded-full px-4 py-1.5 text-xs font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    !genre
                      ? "bg-linear-to-br from-primary to-secondary text-on-primary shadow-[0_0_12px_rgba(163,166,255,0.35)]"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }
                `}
          >
            All
          </button>
          {(GENRES as string[]).map((g) => {
            const active = genre === g;
            return (
              <button
                key={g}
                onClick={() => updateParam("genre", active ? null : g)}
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
                {g}
              </button>
            );
          })}
        </div>
      </FilterSection> */}

      {/* ── Rating ────────────────────────────────────────────────────── */}
      {/* <FilterSection title="Rating">
        <div className="relative mb-3 h-1.5 rounded bg-surface-container-high">
          <div
            className="absolute inset-y-0 left-0 rounded bg-linear-to-r from-primary to-secondary
            transition-all duration-150"
            style={{ width: `${ratingPercent}%` }}
            aria-hidden
          />

          <input
            type="range"
            disabled
            min={1}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) =>
              updateParam("rating", clamp(parseFloat(e.target.value), 1, 5))
            }
            aria-label={`Minimum rating: ${rating.toFixed(1)}`}
            className="absolute inset-0 h-5 w-full cursor-not-allowed opacity-0"
          />

          <div
            aria-hidden
            className="
              pointer-events-none absolute top-1/2 size-4
              -translate-y-1/2 rounded-full
              border-2 border-surface bg-primary
              shadow-[0_0_6px_rgba(163,166,255,0.6)]
              transition-all duration-150
            "
            style={{ left: `calc(${ratingPercent}% - 8px)` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-medium text-on-surface-variant">
          <span>1.0+</span>
          <span className="font-bold text-primary">{rating.toFixed(1)}+</span>
          <span>5.0</span>
        </div>
      </FilterSection> */}

      {/* ── Publication Year ───────────────────────────────────────────── */}
      {/* <FilterSection title="Publication Year">
        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              ["From", yearFrom, "yearFrom", 1900, CURRENT_YEAR],
              ["To", yearTo, "yearTo", 1900, CURRENT_YEAR],
            ] as const
          ).map(([label, value, key, min, max]) => (
            <div
              key={label}
              className="rounded-lg bg-surface-container-high p-3 text-center"
            >
              <label
                htmlFor={`year-${key}`}
                className="mb-1 block text-[9px] uppercase tracking-widest text-on-surface-variant"
              >
                {label}
              </label>
              <input
                id={`year-${key}`}
                type="number"
                disabled
                min={min}
                max={max}
                value={value}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) updateParam(key, clamp(v, min, max));
                }}
                className="
                cursor-not-allowed
                  w-full bg-transparent text-center
                  text-sm font-bold text-on-surface
                  outline-none
                  focus:text-primary
                  [appearance:textfield]
                  [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none
                "
              />
            </div>
          ))}
        </div>
      </FilterSection> */}
    </div>
  );
};

export default Filter;
