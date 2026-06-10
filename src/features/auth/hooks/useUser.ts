// ── Get me query ───────────────────────────────────
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../types/auth.types";
import { meQueryOptions } from "../options/auth.options";

const useGetMe = (skipAuthRefresh?: boolean): UseQueryResult<User, Error> =>
  useQuery(meQueryOptions(skipAuthRefresh));

export default function useUser(skipAuthRefresh?: boolean) {
  const { data: user, isLoading, isError } = useGetMe(skipAuthRefresh);
  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
  };
}
