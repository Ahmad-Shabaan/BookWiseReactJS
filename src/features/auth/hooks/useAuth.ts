import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUser, clearUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  forgetPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
} from "../services/authApi";
import { handleErrorMessage } from "../utils/authHelpers";
import { WISHLIST_COUNT_QUERY_KEYS } from "@/features/wishlist/constants/wishlist.constants";
import { BASKET_COUNT_QUERY_KEYS } from "@/features/basket/constants/basket.constants";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Login mutation ────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      dispatch(
        setUser({
          user: { email: variables.email ,userId : data.userId },
          // expiresIn: data.expiresIn,
        }),
      );
      queryClient.invalidateQueries({ queryKey: WISHLIST_COUNT_QUERY_KEYS });
      queryClient.invalidateQueries({ queryKey: BASKET_COUNT_QUERY_KEYS });

      navigate("/library", { replace: true });
    },
  });

  // forget password mutation
  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (response) => {
      const { userId, token } = response.data;
      navigate(`/reset-password?userId=${userId}&token=${token}`, {
        replace: true,
      });
    },
  });

  // reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  // ── Logout mutation ───────────────────────────────────
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    // Regardless of logout success or failure, clear user data and timers
    onSettled: () => {
      dispatch(clearUser());
      queryClient.invalidateQueries({ queryKey: WISHLIST_COUNT_QUERY_KEYS });
      queryClient.invalidateQueries({ queryKey: BASKET_COUNT_QUERY_KEYS });
      navigate("/login", { replace: true });
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
    loginError: handleErrorMessage(loginMutation.error),
    isLoginError: !!loginMutation.error,
    // loginError: axios.isAxiosError(loginMutation.error)
    //   ? (loginMutation.error.response?.data?.message ??
    //     loginMutation.error.message)
    //   : null,
    forgetPassword: (email: string) => forgetPasswordMutation.mutate(email),
    isForgettingPassword: forgetPasswordMutation.isPending,
    forgetPasswordError: handleErrorMessage(forgetPasswordMutation.error),
    isForgettingPasswordError: !!forgetPasswordMutation.error,
    resetPassword: (userId: string, token: string, newPassword: string) =>
      resetPasswordMutation.mutate({ userId, token, newPassword }),
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: handleErrorMessage(resetPasswordMutation.error),
    isResettingPasswordError: !!resetPasswordMutation.error,
  };
}
