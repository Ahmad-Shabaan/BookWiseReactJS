import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  basketCountQueryOptions,
  basketQueryOptions,
} from "../options/basket.query.options";
import type {
  BasketItem,
  Flag,
  BasketResponse,
  UpdateBasketItemProps,
} from "../types";
import { useAppDispatch } from "@/store/hooks";
import type { AxiosError } from "axios";
import { updateBasket } from "../services/basket.api";
import { BASKET_QUERY_KEYS } from "../constants/basket.constants";
import { toast } from "sonner";
import {
  decrementBasketCount,
  incrementBasketCount,
} from "../store/basketSlice";
import { useEffect, useRef } from "react";
import { debounce } from "@/lib/utils/debounceFn";

export const useGetBasket = (
  basketId: string,
): UseQueryResult<BasketResponse, Error> => {
  return useQuery(basketQueryOptions(basketId));
};

export const useGetBasketCount = (
  basketId: string,
  isAuthenticated: boolean,
): UseQueryResult<number, Error> => {
  return useQuery(basketCountQueryOptions(basketId, isAuthenticated));
};

//steps
// update cart
//

export const useUpdateBasket = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const updateBasketFun: UseMutationResult<
    BasketResponse,
    AxiosError,
    UpdateBasketItemProps
  > = useMutation({
    mutationFn: updateBasket,
    onMutate({ basketItem }) {
      let flag: Flag = undefined;
      const oldBasket = queryClient.getQueryData(BASKET_QUERY_KEYS) || [];
      queryClient.setQueryData(
        BASKET_QUERY_KEYS,
        (prevState?: BasketResponse) => {
          if (!prevState) return prevState;
          const updatedItems: BasketItem[] = [];
          let found = false;
          for (const item of prevState.items) {
            // fill with not target
            if (item.id !== basketItem.id) {
              updatedItems.push(item);
              continue;
            }
            found = true;
            // target come in
            // remove it by neglect the process of adding it in new []
            if (basketItem.quantity <= 0) {
              dispatch(decrementBasketCount());
              flag = "Decrement";
              continue;
            }
            // update   separate it in plus button
            // updatedItems.push({ ...item, quantity: basketItem.quantity }); done in separate fun
          }

          // add it if not found and quantity > 0
          if (!found && basketItem.quantity > 0) {
            updatedItems.push(basketItem);
            dispatch(incrementBasketCount());
            flag = "Increment";
          }
          return {
            ...prevState,
            items: updatedItems,
          };
        },
      );
      toast.success("Basket has been updated successfully.");
      return () => {
        if (flag === "Decrement") dispatch(incrementBasketCount());
        if (flag === "Increment") dispatch(decrementBasketCount());
        queryClient.setQueryData(BASKET_QUERY_KEYS, oldBasket);
        toast.error(
          "Oops! We couldn’t update your cart. Please try again in a moment.",
        );
      };
    },
    onError(_, __, rollback) {
      if (rollback) rollback();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEYS,
      });
    },
  });

  return {
    updateOrRemoveBasketItem: (updateBasketProps: UpdateBasketItemProps) =>
      updateBasketFun.mutate(updateBasketProps),
  };
};

export const useUpdateBasketItemQuantity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBasket, // creates a mutation for sending update requests to the server
    onError() {
      toast.error(
        "Oops! Your basket wasn’t updated. Please try again in a moment.",
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEYS,
      });
    },
  });
  // stores a stable reference to the latest mutate function
  const mutateRef = useRef(mutation.mutate);
  useEffect(() => {
    mutateRef.current = mutation.mutate;
    // keeps ref always pointing to the latest mutate from React Query
  }, [mutation.mutate]);

  const debouncedUpdateRef = useRef<
    ((item: UpdateBasketItemProps) => void) & { cancel?: () => void }
  >(null); // stores the debounced function so it persists across renders

  useEffect(() => {
    debouncedUpdateRef.current = debounce((item: UpdateBasketItemProps) => {
      // runs only after user stops clicking for the delay period
      mutateRef.current(item);
      // calls the latest mutate to avoid stale closure issues
    }, 500);

    return () => {
      debouncedUpdateRef.current?.cancel?.();
      // cancels pending debounce when component unmounts
    };
  }, []);

  return {
    updateBasketItemQuantity: ({
      basketId,
      basketItem,
    }: UpdateBasketItemProps) => {
      queryClient.setQueryData(
        BASKET_QUERY_KEYS,
        (prevState?: BasketResponse) => {
          if (!prevState) return prevState;
          const updatedItems: BasketItem[] = [];
          for (const item of prevState.items) {
            // fill with not target
            if (item.id !== basketItem.id) {
              updatedItems.push(item);
              continue;
            }
            // update
            updatedItems.push({ ...item, quantity: basketItem.quantity });
          }
          return {
            ...prevState,
            items: updatedItems,
          };
        },
      );
      toast.success("Basket has been updated successfully.");
      debouncedUpdateRef.current?.({
        basketId: basketId,
        basketItem: basketItem,
      });
    },
  };
};
