import { LoginSocialType, LoginType, RegisterType } from "../../types/authType";
import axiosClient from "./axiosClient";

export const authAPI = {
  login: (payload: LoginType) => axiosClient.post("/auth/login", payload),
  google: (payload: LoginSocialType) =>
    axiosClient.post("/auth/login/google", payload),
  facebook: (payload: LoginSocialType) =>
    axiosClient.post("/auth/login/facebook", payload),
  loginWithSMS: (phone: string) =>
    axiosClient.post("/auth/login/sms", { phone }),
  register: (newUser: RegisterType) =>
    axiosClient.post("/auth/register", newUser),
  verifyToken: () => axiosClient.post("/auth/verify-token"),
  checkPhone: (phone: string) =>
    axiosClient.post("/auth/check-phone", { phone }),
  resetPassword: ({ email }: { email: string }) =>
    axiosClient.post("/auth/reset-password", {
      email,
    }),
};
