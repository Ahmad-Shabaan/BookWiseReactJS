import axiosClient from "@/shared/api/axiosClient";
import type {
  OrderResponse,
} from "../types";

// GET  /api/orders
export const getOrders = async (): Promise<OrderResponse[]> => {
  const res = await axiosClient.get("/orders");
  return res.data;
};
// GET  /api/orders/{id}
export const getOrderDetails = async (id: number): Promise<OrderResponse> => {
  const res = await axiosClient.get(`/orders/${id}`);
  return res.data;
};






