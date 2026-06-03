import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DeliveryMethods } from "../types";
import { deliveryMethodsQueryOptions } from "../options/delivery.methods.query.options";

export const useGetDeliveryMethods = (): UseQueryResult<
  DeliveryMethods[],
  Error
> => {
  return useQuery(deliveryMethodsQueryOptions);
};
