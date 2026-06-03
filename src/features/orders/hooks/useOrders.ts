import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { OrderResponse } from "../types";
import {
  orderDetailsQueryOptions,
  ordersQueryOptions,
} from "../options/orders.query.options";

export const useGetOrders = (): UseQueryResult<OrderResponse[], Error> => {
  return useQuery(ordersQueryOptions());
};

export const useGetOrderDetails = (
  orderId: number,
): UseQueryResult<OrderResponse, Error> => {
  return useQuery(orderDetailsQueryOptions(orderId));
};
