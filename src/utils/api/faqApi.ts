import axiosClient from "./axiosClient";

export const faqApi = {
  gets: () => axiosClient.get("/faq"),
};
