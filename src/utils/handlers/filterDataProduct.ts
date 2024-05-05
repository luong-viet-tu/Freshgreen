import _ from "lodash";
import { ProductType } from "../../types/productType";

interface SortProductsProps {
  products: Array<ProductType>;
  slice: number;
  sold: number;
  sortBy: string | "averageStarRating";
  sort: "asc" | "desc" | boolean;
}

export const InitialSortProduct: SortProductsProps = {
  products: [],
  slice: 4,
  sold: 0,
  sortBy: "averageStarRating",
  sort: "desc",
};

export const filterDataProducts = (props: SortProductsProps) => {
  return _.orderBy(
    _.filter(
      props.products,
      (product: ProductType) =>
        product.sold !== undefined && product.sold >= props.sold
    ),
    [props.sortBy],
    [props.sort]
  ).slice(0, props.slice);
};
