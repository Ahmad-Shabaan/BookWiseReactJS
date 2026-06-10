import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../services/authApi";
import {
  USER_GC_TIME,
  USER_QUERY_KEY,
  USER_STALE_TIME,
} from "../constants/auth.constants";

export const meQueryOptions = () =>
  queryOptions({
    queryKey: USER_QUERY_KEY,
    queryFn: getMe,
    staleTime: USER_STALE_TIME,
    gcTime: USER_GC_TIME,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
