import { queryOptions } from "@tanstack/react-query";
import {
  ORDERS_QUERY_KEYS,
  ORDERS_GC_TIME,
  ORDERS_STALE_TIME,
} from "../constants/orders.constants";

import { getOrderDetails, getOrders } from "../services/orders.api";

export const ordersQueryOptions = () =>
  queryOptions({
    queryFn: getOrders,
    queryKey: ORDERS_QUERY_KEYS.all(),
    staleTime: ORDERS_STALE_TIME,
    gcTime: ORDERS_GC_TIME,
  });

export const orderDetailsQueryOptions = (orderId: number) =>
  queryOptions({
    queryFn: () => getOrderDetails(orderId),
    queryKey: ORDERS_QUERY_KEYS.details(orderId),
    staleTime: ORDERS_STALE_TIME,
    gcTime: ORDERS_GC_TIME,
  });
