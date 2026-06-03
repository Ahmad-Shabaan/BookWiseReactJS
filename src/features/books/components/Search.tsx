import { debounce } from "@/lib/utils/debounceFn";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEBOUNCE_MS = 400;

const BookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const qParam = searchParams.get("search") ?? "";
  // Local state only for debounce — URL is source of truth
  const [query, setQuery] = useState(qParam);

  // ── Sync URL → input on back/forward nav ─────────────────────────────────
  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  // ── Debounce: input → URL ─────────────────────────────────────────────────
  // debounce function (ONE TIME)
  // ↓
  // timer #1 (user typing)
  // ↓ finished → runs setSearchParams
  // ↓
  // timer #2 (user types again)
  const debouncedUpdateRef = useRef(
    debounce((value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value.trim()) {
        next.set("search", value.trim());
        next.set("page", "1");
      } else {
        next.delete("search");
        next.set("page", "1");
      }
      setSearchParams(next, { replace: true });
    }, DEBOUNCE_MS),
  );

  useEffect(() => {
    const debounced = debouncedUpdateRef.current;

    return () => {
      // Cleanup on unmount: clear any pending debounce timers
      debounced.cancel?.();
    };
  }, []);

  const clearFilter = (q: string) => {
    setQuery("");
    const next = new URLSearchParams(searchParams);
    next.delete(q);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };
  return (
    <section className="flex-1">
      <div className="flex flex-wrap items-end justify-between gap-6">
        {/* ── Title + Search ──────────────────────────────────────────────── */}
        <div className="w-full max-w-xl" data-anim="title">
          <div className="relative" role="search">
            {/* Search icon */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute left-4 top-1/2
                -translate-y-1/2 text-lg text-outline
                transition-colors duration-200
                peer-focus:text-primary
              "
            >
              🔍
            </span>

            <input
              id="book-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                debouncedUpdateRef.current?.(e.target.value);
              }}
              placeholder="Search by title, author, or ISBN..."
              aria-label="Search books"
              autoComplete="off"
              className="
                peer w-full rounded-full bg-surface-container-high
                py-3 pl-12 pr-10 text-sm text-on-surface
                outline-none ring-2 ring-transparent
                placeholder:text-on-surface-variant/60
                transition-all duration-200
                focus:ring-primary/40

              "
            />

            {/* Clear button */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => clearFilter("search")}
                aria-label="Clear search"
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex h-5 w-5 items-center justify-center
                  rounded-full bg-surface-container-highest
                  text-[11px] text-on-surface-variant
                  transition hover:bg-primary/20 hover:text-primary
                "
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSearch;
