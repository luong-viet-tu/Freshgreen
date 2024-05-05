import React from "react";
import { Box, Skeleton } from "@mui/material";

const ProductListSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 5,
      }}
    >
      <Skeleton variant="rectangular" width={80} height={80} animation="wave" />
      <Box>
        <Skeleton variant="text" width={150} height={30} animation="wave" />
        <Skeleton variant="text" width={80} height={20} animation="wave" />
        <Skeleton variant="text" width={120} height={20} animation="wave" />
      </Box>
    </Box>
  );
};

export default ProductListSkeleton;
