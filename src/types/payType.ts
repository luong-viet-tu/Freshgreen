export interface PayDataProps {
  amount: number;
  totalPrice: number;
  address: string;
  phone: string;
  email: string;
  nameOfUser: string;
  discount?: {
    voucher: string;
    discount: number;
  };
}

export const InitialPayData: PayDataProps = {
  amount: 0,
  totalPrice: 0,
  address: "",
  phone: "",
  email: "",
  nameOfUser: "",
};

export interface PayMethodOptionItem {
  name: string;
  path: string;
  image: string;
  value: string;
}

export interface VNPayMethod {
  amount: number;
  bankCode: string;
}
