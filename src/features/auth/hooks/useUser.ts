// ── Get me query ───────────────────────────────────
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../types/auth.types";
import { meQueryOptions } from "../options/auth.options";

const useGetMe = (): UseQueryResult<User, Error> => useQuery(meQueryOptions());

export default function useUser() {
  const { data: user, isLoading, isError } = useGetMe();
  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
  };
}
