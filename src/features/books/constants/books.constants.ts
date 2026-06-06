import type { BookFilters } from "../types/book";

export const BOOKS_PAGE_SIZE = 12;
export const SEARCH_DEBOUNCE_MS = 300;
export const BOOKS_STALE_TIME = 300_000;
export const BOOKS_GC_TIME = 1_800_000;

export const BOOKS_QUERY_KEYS = {
  all: () => ["books"] as const,
  list: (filters: BookFilters) => ["books", "list", filters] as const,
  details: (id: number) => ["books", "details", id] as const,
};
export const TRENDING_BOOKS_QUERY_KEY = ["trending-books"] as const
export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export const AUTHORS_QUERY_KEY = ["authors"] as const;

export const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  Available: {
    label: "Available",
    class: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  Unavailable: {
    label: "Unavailable",
    class: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  OutOfStock: {
    label: "Out of Stock",
    class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
};
