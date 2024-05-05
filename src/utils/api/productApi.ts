import { PaginationType } from "../../types/dataTypes";
import { ProductType } from "../../types/productType";
import axiosClient from "./axiosClient";

export const productApi = {
  gets: (pagination?: PaginationType) => {
    const queryParams = new URLSearchParams();
    let apiUrl = "";
    if (!pagination) {
      return axiosClient.get("/products");
    }
    if (pagination.page) queryParams.append("page", pagination.page.toString());
    if (pagination.perPage)
      queryParams.append("perPage", pagination.perPage.toString());
    if (pagination.categorySelected)
      queryParams.append("category", pagination.categorySelected.join(","));
    if (pagination.storeSelected)
      queryParams.append("shop", pagination.storeSelected.join(","));
    if (pagination.minPrice)
      queryParams.append("minPrice", pagination.minPrice.toString());
    if (pagination.maxPrice)
      queryParams.append("maxPrice", pagination.maxPrice.toString());

    apiUrl = `/products?${queryParams.toString()}`;
    return axiosClient.get(apiUrl);
  },

  get: (productTitle: string) => axiosClient.get(`/products/${productTitle}`),

  getPopularProducts: () => axiosClient.get("/products/popular"),
  getProductsBestSeller: () => axiosClient.get("/products/best-seller"),
  getProductsView: () => axiosClient.get("/products/products-view"),
  getNewProducts: () => axiosClient.get("/products/new"),
  similarProducts: ({
    category,
    tags,
  }: {
    category: string;
    tags: { name: string }[];
  }) =>
    axiosClient.post("/products/similar", {
      category,
      tags,
    }),
  getProductsRatedHighest: () => axiosClient.get("/products/rated-highest"),
  getBiggestDiscountProducts: () =>
    axiosClient.get("/products/biggest-discount"),

  create: (newProduct: ProductType) =>
    axiosClient.post("/products/create", newProduct),

  update: (newProduct: ProductType) =>
    axiosClient.put(`/products/${newProduct._id}`, newProduct),

  updateView: (productId: string) =>
    axiosClient.put(`/products/views/${productId}`),

  delete: (product: ProductType) =>
    axiosClient.patch(`/products/${product._id}`),

  shopProducts: (id: string) =>
    axiosClient.get(`/products/shop/${id}/products`),

  searchProducts: (searchQuery: string) =>
    axiosClient.get(`/products/search?product=${searchQuery}`),
};
