export const WISHLIST_STALE_TIME = 60_000;
export const WISHLIST_GC_TIME = 300_000;

export const WISHLIST_COUNT_QUERY_KEYS = ["wishlist", "count"];

export const WISHLIST_QUERY_KEYS = (pageIndex: number) =>
  ["wishlist", pageIndex] as const;
