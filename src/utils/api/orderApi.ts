import { OrderItemType, PayStatus, SubmitProps } from "../../types/orderType";
import axiosClient from "./axiosClient";

export const orderApi = {
  getOrders: (userId: string) => axiosClient.get(`/orders/user/${userId}`),
  createOrder: (userId: string, order: OrderItemType) =>
    axiosClient.post(`/orders/user/${userId}`, { order }),
  updateStatusOrder: (userId: string, orderId: string, status: PayStatus) =>
    axiosClient.put(`/orders/${orderId}/user/${userId}`, { status }),
  delete: (orderId: string, userId: string) =>
    axiosClient.delete(`/orders/${orderId}/user/${userId}`),

  statusOrder: ({ userId, orderId, status, message = "" }: SubmitProps) =>
    axiosClient.put(`/orders/${orderId}/user/${userId}`, {
      status,
      message,
    }),
};
