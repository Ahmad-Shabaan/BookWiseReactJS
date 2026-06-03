import axiosClient from "@/shared/api/axiosClient";
import type {
  WishlistBookProps,
  WishlistResponse,
  WishlistToggleResponse,
} from "../types/wishlist";
import { v4 as uuidv4 } from "uuid";

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
  wishlist: WishlistBookProps,
): Promise<WishlistToggleResponse> => {
  const res = wishlist.isWished
    ? await axiosClient.post(`/v1/wishlist/${wishlist.bookId}`, null, {
        headers: {
          "X-Idempotency-Key": uuidv4(),
        },
      })
    : await axiosClient.delete(`/v1/wishlist/${wishlist.bookId}`, {
        headers: {
          "X-Idempotency-Key": uuidv4(),
        },
      });
  return res.data;
};

export { toggleWishlistAsync, getWishlist, getWishlistCount };
