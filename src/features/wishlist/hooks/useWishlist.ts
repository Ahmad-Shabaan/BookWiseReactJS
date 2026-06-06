import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticToggle, revertToggle } from "../store/wishlistSlice";
import { v4 as uuidv4 } from "uuid";

import type {
  ToggleWishlistAsyncParams,
  WishlistResponse,
  WishlistToggleResponse,
} from "../types/wishlist";
import type { AxiosError } from "axios";
import {
  wishlistCountQueryOptions,
  wishlistQueryOptions,
} from "../options/wishlist.query.options";
import {
  removeFromWishlistAsync,
  toggleWishlistAsync,
} from "../services/wishlist.api";
import { BOOKS_QUERY_KEYS } from "@/features/books/constants/books.constants";
import { toast } from "sonner";
import { useFiltersFromURL } from "@/features/books/hooks/useFilter";
import { useRef } from "react";
import type { BookFilters, BooksResponse } from "@/features/books/types/book";
import {
  WISHLIST_PAGE_SIZE,
  WISHLIST_QUERY_KEYS,
} from "../constants/wishlist.constants";
import { useSearchParams } from "react-router-dom";

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

const useToggleWishlistFromBooks = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const checkoutIdempotencyKey = useRef<string | null>(null); //fixed across re-render
  const useMutationToggleWishlist: UseMutationResult<
    WishlistToggleResponse,
    AxiosError,
    ToggleWishlistAsyncParams
  > = useMutation({
    mutationFn: toggleWishlistAsync,
    onMutate(variables) {
      dispatch(optimisticToggle(variables.bookId));
      // const oldBooks: BooksResponse | undefined = queryClient.getQueryData(
      //   BOOKS_QUERY_KEYS.list(variables.filters),
      // ); //Closure now captures only: wasWished
      const wasWished = queryClient
        .getQueryData<BooksResponse>(BOOKS_QUERY_KEYS.list(variables.filters))
        ?.data?.find((b) => b.id === variables.bookId)?.isWished;

      queryClient.setQueryData(
        BOOKS_QUERY_KEYS.list(variables.filters),
        (prevState?: BooksResponse) => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            data: prevState.data.map((book) =>
              book.id === variables.bookId
                ? { ...book, isWished: variables.isWished }
                : book,
            ),
          };
        },
      );
      return () => {
        dispatch(revertToggle(variables.bookId));
        if (wasWished === undefined) return;
        queryClient.setQueryData<BooksResponse>(
          BOOKS_QUERY_KEYS.list(variables.filters),
          (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              data: prev.data.map((book) =>
                book.id === variables.bookId
                  ? { ...book, isWished: wasWished }
                  : book,
              ),
            };
          },
        );
      };
    },
    onError(_, wishlistParams, rollback) {
      if (rollback) rollback();
      toast.error(
        `Oops! Your book wasn’t ${wishlistParams.isWished ? "added to" : "deleted from"} wishlist. Please try again in a moment.`,
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: WISHLIST_QUERY_KEYS.all(),
        // queryKey: wishlistQueryOptions(variables.filters.pageIndex || 1)
        // .queryKey,
      });
    },
    onSettled: () => {
      checkoutIdempotencyKey.current = null;
    },
  });

  return {
    toggleWishlist: (wishlist: ToggleWishlistParams) => {
      if (wishlist.isWished) {
        checkoutIdempotencyKey.current =
          checkoutIdempotencyKey.current ?? uuidv4(); //reuses existing key for rapid double-clicks
      }
      return useMutationToggleWishlist.mutate({
        ...wishlist,
        checkoutIdempotencyKey: wishlist.isWished
          ? checkoutIdempotencyKey.current
          : null,
      });
    },
  };
};

const useRemoveFromWishlist = () => {
  const dispatch = useAppDispatch();
  const wishedIds = useAppSelector((state) => state.wishlist.wishlistBooks);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get("page") || 1);
  const useMutationRemoveFromWishlist: UseMutationResult<
    WishlistToggleResponse,
    AxiosError,
    number
  > = useMutation({
    mutationFn: removeFromWishlistAsync,
    onMutate(bookId) {
      dispatch(optimisticToggle(bookId));

      const item = queryClient
        .getQueryData<WishlistResponse>(WISHLIST_QUERY_KEYS.list(pageIndex))
        ?.items?.find((b) => b.id === bookId);

      queryClient.setQueryData<WishlistResponse>(
        WISHLIST_QUERY_KEYS.list(pageIndex),
        (prevState) => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            items: prevState.items.filter((book) => book.id !== bookId),
          };
        },
      );
      return () => {
        dispatch(revertToggle(bookId));
        if (item === undefined) return;
        queryClient.setQueryData<WishlistResponse>(
          WISHLIST_QUERY_KEYS.list(pageIndex),
          (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              items: [...prev.items, item],
            };
          },
        );
      };
    },
    onError(_, __, rollback) {
      toast.error(
        `Oops! Your book wasn’t deleted from wishlist. Please try again in a moment.`,
      );
      if (rollback) rollback();
    },
    onSuccess() {
      if (wishedIds.length > WISHLIST_PAGE_SIZE)
        queryClient.invalidateQueries({
          queryKey: WISHLIST_QUERY_KEYS.all(),
        });
    },
  });

  return {
    removeFromWishlist: (bookId: number) => {
      return useMutationRemoveFromWishlist.mutate(bookId);
    },
  };
};

export const useHandleToggleWishlist = () => {
  const { toggleWishlist: toggleWishlistFromBooks } =
    useToggleWishlistFromBooks();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const filters = useFiltersFromURL();
  return ({
    bookId,
    isWished,
    page,
  }: {
    bookId: number;
    isWished: boolean;
    page: "Main" | "Wishlist";
  }) =>
    page === "Main"
      ? toggleWishlistFromBooks({
          bookId,
          isWished: !isWished,
          filters,
        })
      : removeFromWishlist(bookId);
};
