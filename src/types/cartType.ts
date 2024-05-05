import { ProductType } from "./productType";

export interface ProductCartType extends ProductType {
  count: number;
}

export interface CartType {
  _id?: string;
  user: string;
  products: ProductCartType[];
  totalPrice: number;
}

export const InitialCart: CartType = {
  user: "",
  products: [],
  totalPrice: 0,
};
