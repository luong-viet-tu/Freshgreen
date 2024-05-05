import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderItemType, OrderStatus, SubmitProps } from "../types/orderType";

import { orderApi } from "../utils/api/orderApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { removeItem } from "../utils/handlers/tokenHandler";

export const orderActions = {
  getOrders: createAsyncThunk("/order/gets", async (userId: string) => {
    try {
      const res = await orderApi.getOrders(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  createOrder: createAsyncThunk<any, { userId: string; order: OrderItemType }>(
    "/order/create",
    async ({ userId, order }) => {
      try {
        const res = await orderApi.createOrder(userId, order);
        NotificationToast({ message: "Đơn hàng đã được đặt", type: "success" });
        removeItem("cart");
        return res.data;
      } catch (error) {
        NotificationToast({ message: "Đặt hàng thất bại", type: "error" });
        throw error;
      }
    }
  ),

  submitStatusOrder: createAsyncThunk<
    { orderId: string; status: OrderStatus.done; message?: string },
    SubmitProps
  >("order/status", async ({ userId, orderId, status, message }) => {
    try {
      const res = await orderApi.statusOrder({
        userId,
        orderId,
        status:
          status === OrderStatus.done ? OrderStatus.done : OrderStatus.refuse,
        message,
      });
      NotificationToast({
        message: `${
          status === OrderStatus.done ? "Cảm ơn bạn" : "Đã Từ chối đơn hàng"
        }`,
        type: "success",
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  deleteOrder: createAsyncThunk(
    "order/delete",
    async ({ orderId, userId }: { orderId: string; userId: string }) => {
      try {
        const res = await orderApi.delete(orderId, userId);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
};
