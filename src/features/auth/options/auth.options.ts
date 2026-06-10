import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../services/authApi";
import {
  USER_GC_TIME,
  USER_QUERY_KEY,
  USER_STALE_TIME,
} from "../constants/auth.constants";

export const meQueryOptions = (skipAuthRefresh?: boolean) =>
  queryOptions({
    queryKey: USER_QUERY_KEY,
    queryFn: () => getMe(skipAuthRefresh),
    staleTime: USER_STALE_TIME,
    gcTime: USER_GC_TIME,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
