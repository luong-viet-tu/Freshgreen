import axiosClient from "./axiosClient";

export const settingsApi = {
  getBanner: () => axiosClient.get("/settings/banners"),
};
