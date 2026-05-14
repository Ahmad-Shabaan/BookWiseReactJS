import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { setUser, clearUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginApi,
  logoutApi,
  refreshApi,
} from "../services/authApi";


export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const expiresAt = useAppSelector((state) => state.auth.expiresAt);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  // ── Auto-refresh scheduler ─────────────────────────────
  const scheduleRefresh = (expiresIn: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const refreshIn = (expiresIn - 30) * 1000; // 30s before expiry

    timerRef.current = setTimeout(async () => {
      try {
        const { data } = await refreshApi();
        dispatch(setUser({ user, expiresIn: data.expiresIn }));
        scheduleRefresh(data.expiresIn); // reschedule
      } catch {
        dispatch(clearUser()); // refresh failed → logout
      }
    }, refreshIn);
  };

  // Restart timer if store is rehydrated (e.g. page refresh)
  useEffect(() => {
    if (expiresAt) {
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);
      if (remaining > 0) scheduleRefresh(remaining);
      else dispatch(clearUser());
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // ── Login mutation ────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }, variables) => {
      dispatch(
        setUser({
          user: { email: variables.email },
          expiresIn: data.expiresIn,
        }),
      );
      scheduleRefresh(data.expiresIn);
      navigate("/dashboard", { replace: true });
    },
  });

  // ── Logout mutation ───────────────────────────────────
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    // Regardless of logout success or failure, clear user data and timers
    onSettled: () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      dispatch(clearUser());
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    login: (email: string, password: string): void =>
      loginMutation.mutate({ email, password }),
    logout: () => logoutMutation.mutate(),
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    // loginError: loginMutation.error?.response?.data?.message ?? null,
    loginError: axios.isAxiosError(loginMutation.error)
      ? (loginMutation.error.response?.data?.message ??
        loginMutation.error.message)
      : null,
  };
}
