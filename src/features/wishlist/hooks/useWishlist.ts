import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks";
import { optimisticToggle, revertToggle } from "../store/wishlistSlice";
import { v4 as uuidv4 } from "uuid";

import type {
  WishlistBookParams,
  WishlistResponse,
  WishlistToggleResponse,
} from "../types/wishlist";
import type { AxiosError } from "axios";
import {
  wishlistCountQueryOptions,
  wishlistQueryOptions,
} from "../options/wishlist.query.options";
import { toggleWishlistAsync } from "../services/wishlist.api";
import { BOOKS_QUERY_KEYS } from "@/features/books/constants/books.constants";
import { toast } from "sonner";
import { useFiltersFromURL } from "@/features/books/hooks/useFilter";
import { useRef } from "react";
import type { BookFilters, BooksResponse } from "@/features/books/types/book";

type ToggleWishlistParams = {
  bookId: number;
  isWished: boolean;
  filters: BookFilters;
};
export const useGetWishlist = (
  pageIndex: number,
): UseQueryResult<WishlistResponse, Error> => {
  return useQuery(wishlistQueryOptions(pageIndex));
};

export const useGetWishlistCount = (
  isAuthenticated: boolean,
): UseQueryResult<number, Error> => {
  return useQuery(wishlistCountQueryOptions(isAuthenticated));
};

const useToggleWishlist = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const checkoutIdempotencyKey = useRef<string | null>(uuidv4()); //fixed across re-render
  const useToggleWishlist: UseMutationResult<
    WishlistToggleResponse,
    AxiosError,
    WishlistBookParams
  > = useMutation({
    mutationFn: toggleWishlistAsync,
    onMutate(variables) {
      dispatch(optimisticToggle(variables.bookId));
      const oldBooks =
        queryClient.getQueryData(BOOKS_QUERY_KEYS.list(variables.filters)) ||
        [];
      queryClient.setQueryData(
        BOOKS_QUERY_KEYS.list(variables.filters),
        (prevState?: BooksResponse) => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            data: prevState?.data.map((book) => {
              if (book.id === variables.bookId) {
                return { ...book, isWished: variables.isWished };
              } else {
                return book;
              }
            }),
          };
        },
      );
      toast.success(
        `Book has been ${variables.isWished ? "added to" : "deleted from"} wishlist successfully.`,
      );
      return () => {
        dispatch(revertToggle(variables.bookId));
        queryClient.setQueryData(
          BOOKS_QUERY_KEYS.list(variables.filters),
          oldBooks,
        );
        toast.error(
          `Oops! Your book wasn’t ${variables.isWished ? "added to" : "deleted from"} wishlist. Please try again in a moment.`,
        );
      };
    },
    onError(_, __, rollback) {
      if (rollback) rollback();
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: wishlistQueryOptions(variables.filters.pageIndex || 1)
          .queryKey,
      });
      checkoutIdempotencyKey.current = null;
    },
  });

  return {
    toggleWishlist: (wishlist: ToggleWishlistParams) =>
      useToggleWishlist.mutate({
        ...wishlist,
        checkoutIdempotencyKey: checkoutIdempotencyKey.current,
      }),
  };
};

export const useHandleToggleWishlist = () => {
  const { toggleWishlist } = useToggleWishlist();
  const filters = useFiltersFromURL();
  // const checkoutIdempotencyKey = useRef(uuidv4()); //fixed across re-render
  return ({ bookId, isWished }: { bookId: number; isWished: boolean }) =>
    toggleWishlist({
      bookId,
      isWished: !isWished,
      filters,
      // checkoutIdempotencyKey: checkoutIdempotencyKey.current,
    });
};
