import { changeAvatarProps } from "../../actions/userActions";
import { UserType } from "../../types/userType";
import axiosClient from "./axiosClient";

export const userApi = {
  changeAvatar: (payload: changeAvatarProps) =>
    axiosClient.post(`/users/${payload._id}/change-avatar`, payload),

  updateUser: (payload: UserType) =>
    axiosClient.put(`/users/${payload._id}/`, payload),

  deleteUser: (id: string) => axiosClient.patch(`/users/${id}`),

  getUsers: () => axiosClient.get("/users/gets"),

  getUser: (id: string) => axiosClient.get(`/users/${id}`),

  sendCodeEmail: (email: string) =>
    axiosClient.post(`users/send-code-email`, { email }),

  verifyEmail: (email: string, code: string) =>
    axiosClient.post(`users/verify-email`, { email, code }),

  verifyPhone: (phone: string) =>
    axiosClient.post(`users/verify-phone`, { phone }),
};
