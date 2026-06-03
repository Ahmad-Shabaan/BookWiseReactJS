import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks";
import { optimisticToggle, revertToggle } from "../store/wishlistSlice";

import type {
  WishlistBookProps,
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
import { useSearchParams } from "react-router-dom";
import type { BooksResponse } from "@/shared/types/api.types";
import { toast } from "sonner";

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
  const useToggleWishlist: UseMutationResult<
    WishlistToggleResponse,
    AxiosError,
    WishlistBookProps
  > = useMutation({
    mutationFn: toggleWishlistAsync,
    onMutate(variables) {
      dispatch(optimisticToggle(variables.bookId));
      const oldBooks =
        queryClient.getQueryData(
          BOOKS_QUERY_KEYS.list({
            pageIndex: variables.pageIndex,
            search: variables.search,
            // authorId: variables.authorId,
            category: variables.category,
          }),
        ) || [];
      queryClient.setQueryData(
        BOOKS_QUERY_KEYS.list({
          pageIndex: variables.pageIndex,
          search: variables.search,
          // authorId: variables.authorId,
          category: variables.category,
        }),
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
          BOOKS_QUERY_KEYS.list({
            pageIndex: variables.pageIndex,
            search: variables.search,
            authorId: variables.authorId,
            category: variables.category,
          }),
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
        queryKey: wishlistQueryOptions(variables.pageIndex).queryKey,
      });
    },
  });

  return {
    toggleWishlist: (wishlist: WishlistBookProps) =>
      useToggleWishlist.mutate(wishlist),
  };
};

export const useHandleToggleWishlist = () => {
  const { toggleWishlist } = useToggleWishlist();
  const [searchParams] = useSearchParams();
  return ({ bookId, isWished }: { bookId: number; isWished: boolean }) =>
    toggleWishlist({
      bookId,
      isWished: !isWished,
      pageIndex: parseInt(searchParams.get("page") || "1"), // Pass the current page index if needed for cache updates
      search: searchParams.get("search") || "",
      // authorId: parseInt(searchParams.get("authorId"))||1,
      category: searchParams.get("category") || "",
    });
};
