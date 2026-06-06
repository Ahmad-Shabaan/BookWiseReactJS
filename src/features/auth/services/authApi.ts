//  # TanStack Query mutations/queries'
import axiosClient from "@/shared/api/axiosClient";
import type { SignupFormValues } from "../schemas/signup.schema";
import type { User } from "../types/auth.types";

const loginApi = async (creds: {
  email: string;
  password: string;
}): Promise<User> => (await axiosClient.post("/account/login", creds)).data;

const logoutApi = async () => await axiosClient.delete("/account/logout");
const refreshApi = async () => await axiosClient.post("/account/refresh-token");
const signupApi = async (creds: SignupFormValues) =>
  await axiosClient.post("/account/register", creds);

const forgetPasswordApi = async (email: string) =>
  await axiosClient.post(`/account/forget-password?email=${email}`);

const resetPasswordApi = async (data: {
  userId: string;
  token: string;
  newPassword: string;
}) => await axiosClient.post("/account/reset-password", data);

export {
  loginApi,
  logoutApi,
  refreshApi,
  signupApi,
  forgetPasswordApi,
  resetPasswordApi,
};
