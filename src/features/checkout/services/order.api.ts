import axiosClient from "@/shared/api/axiosClient";
import type {
  AddressForm,
  Order,
  OrderResponse,
} from "../types";

export const checkout = async (order: AddressForm): Promise<Order> => {
  const mappedOrder = {
    ShipToAddress: {
      FirstName: order.firstName,
      LastName: order.lastName,
      Country: order.country,
      City: order.city,
      State: order.state,
      Street: order.street,
      PostalCode: order.postalCode,
    },
    BasketId: order.basketId,
    DeliveryMethodId: order.deliveryMethodId,
  };
  const res = await axiosClient.post("/payments/checkout", mappedOrder);
  return res.data;
};

export const getOrderByPaymobOrderId = async (
  id: string,
): Promise<OrderResponse> => {
  const res = await axiosClient.get(`/orders/paymob/${id}/confirm`);
  return res.data;
};



