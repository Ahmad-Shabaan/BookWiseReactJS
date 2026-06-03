import { queryOptions } from "@tanstack/react-query";
import {
  DELIVERY_METHOD_QUERY_KEYS,
  DELIVERY_METHOD_GC_TIME,
  DELIVERY_METHOD_STALE_TIME,
} from "../constants/delivery.methods.constants";
import { getDeliveryMethods } from "../services/delivery.methods.api";

export const deliveryMethodsQueryOptions = queryOptions({
  queryFn: getDeliveryMethods,
  queryKey: DELIVERY_METHOD_QUERY_KEYS,
  staleTime: DELIVERY_METHOD_STALE_TIME,
  gcTime: DELIVERY_METHOD_GC_TIME,
});
