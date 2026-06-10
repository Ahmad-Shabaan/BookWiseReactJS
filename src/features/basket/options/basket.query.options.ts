import { queryOptions } from "@tanstack/react-query";
import {
  BASKET_COUNT_QUERY_KEYS,
  BASKET_QUERY_KEYS,
  BASKET_GC_TIME,
  BASKET_STALE_TIME,
  BASKET_COUNT_STALE_TIME,
  BASKET_COUNT_GC_TIME,
} from "../constants/basket.constants";

import { getBasketCount, getBasket } from "../services/basket.api";

export const basketCountQueryOptions = (
  isAuthenticated: boolean,
  basketId?: string,
) =>
  queryOptions({
    queryFn: ({ signal }) => getBasketCount(signal, basketId),
    queryKey: BASKET_COUNT_QUERY_KEYS(isAuthenticated),
    staleTime: BASKET_COUNT_STALE_TIME,
    gcTime: BASKET_COUNT_GC_TIME,
    enabled: isAuthenticated,
  });

export const basketQueryOptions = (basketId?: string) =>
  queryOptions({
    queryFn: () => getBasket(basketId),
    queryKey: BASKET_QUERY_KEYS,
    staleTime: BASKET_STALE_TIME,
    gcTime: BASKET_GC_TIME,
    enabled: !!basketId,
  });
