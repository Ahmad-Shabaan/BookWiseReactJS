import axiosClient from "@/shared/api/axiosClient";
import type { BasketResponse, UpdateBasketItemParams } from "../types";

// # TanStack Query mutations/queries'
//Add to wishlist and remove from wishlist APIs

// or recreate if not exist
const getBasket = async (basketId?: string): Promise<BasketResponse> => {
  const res = await axiosClient.get("/basket", { params: { basketId } });
  return res.data;
};

const getBasketCount = async (
  signal: AbortSignal,
  basketId?: string,
): Promise<number> => {
  const res = await axiosClient.get("/basket", {
    params: { basketId },
    signal,
  });
  const basket: BasketResponse = res.data;
  const count = basket.items.length;
  return count;
};

const updateBasketDeliveryMethod = async (
  basket: BasketResponse,
): Promise<BasketResponse> => {
  const res = await axiosClient.put("/basket", basket);
  return res.data;
};

const updateBasket = async (
  updateBasketParams: UpdateBasketItemParams,
): Promise<BasketResponse> => {
  const res = await axiosClient.patch(
    `/basket/${updateBasketParams.basketId}`,
    {
      ...updateBasketParams.basketItem,
    },
  );
  return res.data;
};
export { getBasket, updateBasket, getBasketCount, updateBasketDeliveryMethod };
