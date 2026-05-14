//  # TanStack Query mutations/queries'
import axiosClient from "@/shared/api/axiosClient";
import type { SignupFormValues } from "../schemas/signup.schema";

const loginApi = async (creds: { email: string; password: string }) =>
  await axiosClient.post("/account/login", creds);
const logoutApi = async () => await axiosClient.post("/account/logout");
const refreshApi = async () => await axiosClient.post("/account/refresh-token");
const signupApi = async (creds: SignupFormValues) =>
  await axiosClient.post("/account/register", creds);

export { loginApi, logoutApi, refreshApi, signupApi };
