import { createAsyncThunk } from "@reduxjs/toolkit";

import { cartApi } from "../utils/api/cartApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

import { ProductCartType } from "../types/cartType";

export const cartActions = {
  getCart: createAsyncThunk("cart/getCart", async (userId: string) => {
    try {
      const res = await cartApi.getCart(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  addProductToCart: createAsyncThunk<
    any,
    { userId: string; product: ProductCartType }
  >("cart/addProduct", async ({ userId, product }) => {
    try {
      await cartApi.addProductToCart(userId, product);
      NotificationToast({
        message: "Đã thêm sản phẩm vào giỏ hàng",
        type: "success",
      });
      return true;
    } catch (error) {
      NotificationToast({
        message: "Không thể thêm sản phẩm này vào giỏ hàng",
        type: "error",
      });
      throw error;
    }
  }),

  upCountProduct: createAsyncThunk<any, { userId: string; productId: string }>(
    "cart/upCount",
    async ({ userId, productId }) => {
      try {
        await cartApi.upCountProduct(userId, productId);
        return true;
      } catch (error) {
        throw error;
      }
    }
  ),

  downCountProduct: createAsyncThunk<
    any,
    { userId: string; productId: string }
  >("cart/downCount", async ({ userId, productId }) => {
    try {
      await cartApi.downCountProduct(userId, productId);
      return true;
    } catch (error) {
      throw error;
    }
  }),

  removeProduct: createAsyncThunk<any, { userId: string; productId: string }>(
    "cart/deleteProduct",
    async ({ userId, productId }) => {
      try {
        await cartApi.removeProduct(userId, productId);
        return true;
      } catch (error) {
        throw error;
      }
    }
  ),
};
