import { memo } from "react";
import { Box, Typography } from "@mui/material";

import { ProductType } from "../../../types/productType";
import ProductListItem from "../../../components/common/ProductListItem";
import ProductListSkeleton from "../../../components/SkeletonProductListItem";

interface Props {
  bestSeller: Array<ProductType>;
  popular: Array<ProductType>;
  newProducts: Array<ProductType>;
  bestRating: Array<ProductType>;
  biggestDiscount: Array<ProductType>;
}

const HomeList = memo(
  ({ bestRating, bestSeller, newProducts, biggestDiscount }: Props) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          pt: 5,
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: {
              sm: "22%",
              xs: "100%",
            },
          }}
        >
          <Typography fontSize={23} fontWeight={600} pb={2}>
            Bán chạy nhất
          </Typography>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            {bestSeller.length ? (
              bestSeller.map((product) => (
                <ProductListItem key={product._id!} {...product} />
              ))
            ) : (
              <Box>
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              sm: "22%",
              xs: "100%",
            },
          }}
        >
          <Typography fontSize={23} fontWeight={600} pb={2}>
            Giảm giá nhiều nhất
          </Typography>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            {biggestDiscount.length ? (
              biggestDiscount.map((product) => (
                <ProductListItem key={product._id!} {...product} />
              ))
            ) : (
              <Box>
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              sm: "22%",
              xs: "100%",
            },
          }}
        >
          <Typography fontSize={23} fontWeight={600} pb={2}>
            Đã thêm gần đây
          </Typography>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            {newProducts.length ? (
              newProducts.map((product) => (
                <ProductListItem key={product._id!} {...product} />
              ))
            ) : (
              <Box>
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              sm: "22%",
              xs: "100%",
            },
          }}
        >
          <Typography fontSize={23} fontWeight={600} pb={2}>
            Đánh giá cao nhất
          </Typography>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            {bestRating.length ? (
              bestRating.map((product) => (
                <ProductListItem key={product._id!} {...product} />
              ))
            ) : (
              <Box>
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
                <ProductListSkeleton />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default HomeList;
