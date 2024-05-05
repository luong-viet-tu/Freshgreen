import axiosClient from "./axiosClient";

export const favoriteApi = {
  get: (userId: string) => axiosClient.get(`/favorites/${userId}`),
  update: ({ userId, productId }: { userId: string; productId: string }) =>
    axiosClient.post<any>(`/favorites/${userId}/update/${productId}`),
};
