export const WISHLIST_PAGE_SIZE = 12;

export const WISHLIST_STALE_TIME = 300_000;
export const WISHLIST_GC_TIME = 1_800_000;
export const WISHLIST_COUNT_STALE_TIME = 300_000;
export const WISHLIST_COUNT_GC_TIME = 1_800_000;
export const WISHLIST_COUNT_QUERY_KEYS = (isAuthenticated: boolean) =>
  ["wishlist", "count", isAuthenticated] as const;


export const WISHLIST_QUERY_KEYS = {
  all: () => ["wishlist"] as const,
  list: (pageIndex: number) => ["wishlist", pageIndex] as const,
};
