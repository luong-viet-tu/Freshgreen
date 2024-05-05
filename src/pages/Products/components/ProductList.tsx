import { Box } from "@mui/material";
import { memo } from "react";

import { ProductType } from "../../../types/productType";
import ProductCard from "../../../components/common/ProductCard";
import SkeletonCard from "../../../components/SkeletonCard";

const ProductList = memo(({ products }: { products: ProductType[] }) => {
  return products.length ? (
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={5}
      justifyContent={"space-between"}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={5}
      justifyContent={"space-between"}
    >
      <SkeletonCard width={400} />
      <SkeletonCard width={400} />
      <SkeletonCard width={400} />
      <SkeletonCard width={400} />
    </Box>
  );
});

export default ProductList;
