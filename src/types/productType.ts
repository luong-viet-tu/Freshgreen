import { TagType } from "./tagType";

export interface RatingsType {
  starNumber: number;
  auth: string;
  _id?: string;
  created?: string;
  updated?: string;
}

interface Shop {
  _id: string;
  name: string;
  user: {
    avatar: string;
  };
}
export interface ProductType {
  _id?: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  lastPrice: number;
  discount: number;
  sold?: number;
  category: string;
  tags: Array<TagType>;
  status: boolean;
  quantity: number;
  currentQuantity: number;
  averageStarRating: number;
  brand: string;
  shop?: Shop;
  comments: Array<string>;
  views: number;
  unit: string;

  totalSales?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialProduct: ProductType = {
  images: [],
  title: "",
  description: "",
  price: 0,
  lastPrice: 0,
  discount: 0,
  sold: 0,
  unit: "",
  averageStarRating: 0,
  category: "",
  tags: [],
  status: false,
  quantity: 0,
  views: 0,
  currentQuantity: 0,
  brand: "",
  comments: [],
};
