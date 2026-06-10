import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { setUser, clearUser } from "../store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import {
  forgetPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
} from "../services/authApi";
import { handleErrorMessage } from "../utils/authHelpers";
// import { WISHLIST_COUNT_QUERY_KEYS } from "@/features/wishlist/constants/wishlist.constants";
// import { BASKET_COUNT_QUERY_KEYS } from "@/features/basket/constants/basket.constants";
import { persistor } from "@/store/store";

import { toast } from "sonner";
import { USER_QUERY_KEY } from "../constants/auth.constants";
import { RESET_APP } from "@/store/resetAction";

export function useAuth() {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Login mutation ────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEY, data);
      // onSuccess: (data) => {
      // dispatch(
      //   setUser({
      //     user: { email: data.email, userId: data.userId },
      //     // expiresIn: data.expiresIn,
      //   }),
      // );
      // queryClient.invalidateQueries({ queryKey: WISHLIST_COUNT_QUERY_KEYS });
      // queryClient.invalidateQueries({ queryKey: BASKET_COUNT_QUERY_KEYS });
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
    onSuccess: async () => {
      dispatch({ type: RESET_APP });
      await queryClient.cancelQueries();
      queryClient.clear();
      persistor.pause(); //to disable the subscriber before purging:
      await persistor.purge();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Oops! Logout failed. Please try again.");
    },
  });

  return {
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
