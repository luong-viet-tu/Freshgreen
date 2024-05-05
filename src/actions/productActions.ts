import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../utils/api/productApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

import { ProductType } from "../types/productType";
import { PaginationType } from "../types/dataTypes";

export const productActions = {
  gets: createAsyncThunk(
    "product/gets",
    async (pagination?: PaginationType) => {
      try {
        const res = await productApi.gets(pagination);
        return res.data;
      } catch (error) {
        NotificationToast({
          message: "Opps..wrong something...",
          type: "error",
        });
        throw error;
      }
    }
  ),

  get: createAsyncThunk("product/get", async (productTitle: string) => {
    try {
      const res = await productApi.get(productTitle);
      return res.data;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      throw error;
    }
  }),

  popular: createAsyncThunk("product/popular", async () => {
    try {
      const res = await productApi.getPopularProducts();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  bestSeller: createAsyncThunk("product/best-seller", async () => {
    try {
      const res = await productApi.getProductsBestSeller();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  similarProducts: createAsyncThunk<
    any,
    {
      category: string;
      tags: { name: string }[];
    }
  >("product/similar", async ({ category, tags }) => {
    try {
      const res = await productApi.similarProducts({ category, tags });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  newProducts: createAsyncThunk("product/new", async () => {
    try {
      const res = await productApi.getNewProducts();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  ratedHighestProducts: createAsyncThunk("product/rated-hightest", async () => {
    try {
      const res = await productApi.getProductsRatedHighest();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  create: createAsyncThunk(
    "product/create",
    async (newProduct: ProductType, thunkAPI) => {
      try {
        const res = await productApi.create(newProduct);
        NotificationToast({
          message: "Product created successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: "Product created failure",
          type: "error",
        });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  update: createAsyncThunk(
    "product/update",
    async (newProduct: ProductType, thunkAPI) => {
      try {
        const res = await productApi.update(newProduct);
        NotificationToast({
          message: "Product updated successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({ message: "Product update failure", type: "error" });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  delete: createAsyncThunk("product/delete", async (product: ProductType) => {
    try {
      const res = await productApi.delete(product);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error) {
      NotificationToast({ message: "Product delete failure", type: "success" });
      throw error;
    }
  }),

  getShopProducts: createAsyncThunk(
    "product/getShopProducts",
    async (id: string) => {
      try {
        const res = await productApi.shopProducts(id);
        return res.data;
      } catch (error: any) {
        NotificationToast({ message: error.data, type: "error" });
        throw error;
      }
    }
  ),

  searchProducts: createAsyncThunk(
    "product/search",
    async (searchQuery: string) => {
      try {
        const res = await productApi.searchProducts(searchQuery);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  getProductsView: createAsyncThunk("product/prouduct-view", async () => {
    try {
      const res = await productApi.getProductsView();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  getBiggestDiscountProducts: createAsyncThunk(
    "product/biggest-discount",
    async () => {
      try {
        const res = await productApi.getBiggestDiscountProducts();
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  updateView: createAsyncThunk(
    "product/update/view",
    async (productId: string) => {
      try {
        await productApi.updateView(productId);
        return true;
      } catch (error) {
        return false;
      }
    }
  ),
};
