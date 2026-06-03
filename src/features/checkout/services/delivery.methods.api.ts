import axiosClient from "@/shared/api/axiosClient";
import type { DeliveryMethods } from "../types";

export const getDeliveryMethods = async (): Promise<DeliveryMethods[]> => {
  const res = await axiosClient.get("/payments/deliveryMethods");
  return res.data;
};
