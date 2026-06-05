import axiosClient from "@/shared/api/axiosClient";
import type {
  WishlistBookParams,
  WishlistResponse,
  WishlistToggleResponse,
} from "../types/wishlist";

const getWishlist = async (
  pageIndex: number,
  signal: AbortSignal,
): Promise<WishlistResponse> => {
  const res = await axiosClient.get("/v1/wishlist?PageSize=12", {
    params: { PageIndex: pageIndex },
    signal,
  });
  return res.data;
};

const getWishlistCount = async (
  isAuthenticated: boolean,
  signal: AbortSignal,
): Promise<number> => {
  if (!isAuthenticated) return 0;
  const res = await axiosClient.get("/v1/wishlist/count", { signal });
  return res.data.count;
};

const toggleWishlistAsync = async (
  wishlist: WishlistBookParams,
): Promise<WishlistToggleResponse> => {
  console.log("checkoutIdempotencyKey", wishlist.checkoutIdempotencyKey);

  const res = wishlist.isWished
    ? await axiosClient.post(`/v1/wishlist/${wishlist.bookId}`, null, {
        headers: {
          "X-Idempotency-Key":wishlist.checkoutIdempotencyKey ,
        },
      })
    : await axiosClient.delete(`/v1/wishlist/${wishlist.bookId}`, {
        headers: {
          "X-Idempotency-Key": wishlist.checkoutIdempotencyKey,
        },
      });
  return res.data;
};

export { toggleWishlistAsync, getWishlist, getWishlistCount };
