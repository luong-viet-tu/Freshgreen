import { memo } from "react";
import { Box, Typography } from "@mui/material";

import ProductCard from "../../../components/common/ProductCard";
import { ProductType } from "../../../types/productType";
import SkeletonCard from "../../../components/SkeletonCard";

const HomeProducts = memo(({ products }: { products: Array<ProductType> }) => {
  return (
    <Box>
      <Box py={3}>
        <Typography fontWeight={600} fontSize={35} pb={3}>
          Sản phẩm phổ biến
        </Typography>
        {products.length ? (
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={5}
            justifyContent={"space-between"}
          >
            {products.map((product: ProductType) => (
              <ProductCard key={product._id!} product={product} />
            ))}
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={5}
            justifyContent={"space-between"}
          >
            <SkeletonCard width={350} />
            <SkeletonCard width={350} />
            <SkeletonCard width={350} />
            <SkeletonCard width={350} />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default HomeProducts;
