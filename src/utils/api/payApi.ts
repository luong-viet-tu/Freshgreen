import { VNPayMethod } from "../../types/payType";
import axiosClient from "./axiosClient";

export const payApi = {
  visaMethod: (amount: number) =>
    axiosClient.post("/payment/secret", { amount }),
  vnpayMethod: (data: VNPayMethod) => axiosClient.post("/payment/vnpay", data),
  vnpayIPN: () => axiosClient.get("/payment/vnpay_ipn"),
  vnpayReturn: () => axiosClient.get("/payment/vnpay_return"),
  momoMethod: (amount: string) => axiosClient.post("/payment/momo", { amount }),
};
