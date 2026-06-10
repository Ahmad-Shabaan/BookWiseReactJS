export const BASKET_STALE_TIME = 30_000;
export const BASKET_GC_TIME = 1_800_000;
export const BASKET_COUNT_STALE_TIME = 30_000;
export const BASKET_COUNT_GC_TIME = 1_800_000;

export const BASKET_QUERY_KEYS = ["basket"] as const;
export const BASKET_COUNT_QUERY_KEYS = (isAuthenticated: boolean) =>
  ["basket", "count", isAuthenticated] as const;
