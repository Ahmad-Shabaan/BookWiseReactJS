import { queryOptions } from "@tanstack/react-query";
import {
  WISHLIST_COUNT_QUERY_KEYS,
  WISHLIST_GC_TIME,
  WISHLIST_QUERY_KEYS,
  WISHLIST_STALE_TIME,
} from "../constants/wishlist.constants";
import { getWishlist, getWishlistCount } from "../services/wishlist.api";

export const wishlistCountQueryOptions = (isAuthenticated: boolean) =>
  queryOptions({
    queryFn: ({ signal }) => getWishlistCount(isAuthenticated, signal),
    queryKey: WISHLIST_COUNT_QUERY_KEYS,
    staleTime: WISHLIST_STALE_TIME,
    gcTime: WISHLIST_GC_TIME,
  });

export const wishlistQueryOptions = (pageIndex: number) =>
  queryOptions({
    queryFn: ({ signal }) => getWishlist(pageIndex, signal),
    queryKey: WISHLIST_QUERY_KEYS(pageIndex),
    staleTime: WISHLIST_STALE_TIME,
    gcTime: WISHLIST_GC_TIME,
  });
