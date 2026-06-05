import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { checkoutApi } from "../services/order.api";
import type { CheckoutParams, Order } from "../types";
import type { AxiosError } from "axios";

export const useCheckout = () => {
  const checkout: UseMutationResult<Order, AxiosError, CheckoutParams> =
    useMutation({
      mutationFn: checkoutApi,
      retry: 0,
    });

  return {
    handleCheckout: (checkoutParams: CheckoutParams) =>
      checkout.mutateAsync(checkoutParams),
  };
};
