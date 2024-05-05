import { createAsyncThunk } from "@reduxjs/toolkit";

import { favoriteApi } from "../utils/api/favoriteApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

import { ProductType } from "../types/productType";

export const favoriteActions = {
  get: createAsyncThunk("favorite/get", async (userId: string) => {
    try {
      const res = await favoriteApi.get(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  update: createAsyncThunk<any, { userId: string; product: ProductType }>(
    "favorite/update",
    async ({ userId, product }) => {
      try {
        await favoriteApi.update({ userId, productId: product._id as string });
        return product;
      } catch (error) {
        NotificationToast({
          message: "!Oppps...",
          type: "error",
        });
        throw error;
      }
    }
  ),
};
