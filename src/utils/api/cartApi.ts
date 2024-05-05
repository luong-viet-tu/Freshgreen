import { ProductCartType } from "../../types/cartType";
import axiosClient from "./axiosClient";

export const cartApi = {
  getCart: (userId: string) => axiosClient.get(`/cart/${userId}`),
  addProductToCart: (userId: string, product: ProductCartType) =>
    axiosClient.post(`/cart/${userId}/add`, { product }),
  upCountProduct: (userId: string, productId: string) =>
    axiosClient.put(`/cart/${userId}/add/${productId}`),
  downCountProduct: (userId: string, productId: string) =>
    axiosClient.put(`/cart/${userId}/remove/${productId}`),
  removeProduct: (userId: string, productId: string) =>
    axiosClient.put(`/cart/${userId}/product/${productId}`),
};
