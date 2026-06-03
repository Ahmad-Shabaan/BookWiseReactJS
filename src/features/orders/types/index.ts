import type { Address } from "@/features/checkout/types";

export interface OrderResponse {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  deliveryMethod: string;
  deliveryCost: number;
  orderStatus: OrderStatus;
  subtotal: number;
  orderItems: OrderItemResponse[];
  paymentIntentId?: string;
  total: number;
}

export interface OrderItemResponse {
  id:number;
  price: number;
  quantity: number;
  bookTitle: string;
  pictureUrl: string;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "PaymentReceived"
  | "PaymentFailed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
