
export interface DeliveryMethods {
  id: number;
  shortName: string;
  description: string;
  deliveryTime: string;
  cost: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
}
export interface AddressForm extends Address {
  basketId: string;
  deliveryMethodId: number;
}

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  deliveryMethod: DeliveryMethods;
  orderStatus: OrderStatus;
  subtotal: number;
  orderItems: OrderItem[];
  paymentIntentId: string;
  getTotal: number;
  clientSecret: string;
  paymentDate: Date;
  paymobOrderId: number;
  publicKey:string;
}

export type OrderStatus = "Pending" | "PaymentReceived" | "PaymentFailed";

export interface OrderItem {
  id: number;
  Price: number;
  Quantity: number;
  BookItemOrdered: ItemOrdered;
}
export interface ItemOrdered {
  BookId: number;
  BookTitle: number;
  PictureUrl: number;
}

export interface OrderResponse {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  deliveryMethod: string;
  deliveryCost: number;
  orderStatus: string;
  subtotal: number;
  orderItems: OrderItem[];
  paymentIntentId?: string;
  total: number;
}

export interface OrderItem {
  Price: number;
  Quantity: number;
  BookTitle: number;
  PictureUrl: number;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}
