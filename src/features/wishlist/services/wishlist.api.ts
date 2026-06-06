import axiosClient from "@/shared/api/axiosClient";
import type {
  ToggleWishlistAsyncParams,
  WishlistResponse,
  WishlistToggleResponse,
} from "../types/wishlist";
import { WISHLIST_PAGE_SIZE } from "../constants/wishlist.constants";

const getWishlist = async (
  pageIndex: number,
  signal: AbortSignal,
): Promise<WishlistResponse> => {
  const res = await axiosClient.get(
    `/v1/wishlist?PageSize=
    ${WISHLIST_PAGE_SIZE}`,
    {
      params: { PageIndex: pageIndex },
      signal,
    },
  );
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
  wishlist: ToggleWishlistAsyncParams,
): Promise<WishlistToggleResponse> => {
  const res = wishlist.isWished
    ? await axiosClient.post(`/v1/wishlist/${wishlist.bookId}`, null, {
        headers: {
          "X-Idempotency-Key": wishlist.checkoutIdempotencyKey,
        },
      })
    : await axiosClient.delete(`/v1/wishlist/${wishlist.bookId}`);
  return res.data;
};

const removeFromWishlistAsync = async (
  bookId: number,
): Promise<WishlistToggleResponse> => {
  const res = await axiosClient.delete(`/v1/wishlist/${bookId}`);
  return res.data;
};

export {
  toggleWishlistAsync,
  getWishlist,
  getWishlistCount,
  removeFromWishlistAsync,
};
