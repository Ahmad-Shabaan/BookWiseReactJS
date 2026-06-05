export interface BasketItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  author: string;
  publisher: string;
}
export interface BasketResponse {
  id: string;
  items: BasketItem[];
  clientSecret: string;
  paymentIntentId: string;
  deliveryMethodId: number;
  shippingPrice: number;
}

export interface UpdateBasketItemParams {
  basketItem: BasketItem;
  basketId: string;
}

export type Flag = "Increment" | "Decrement" | undefined;
