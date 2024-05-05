import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Rating, Typography } from "@mui/material";

import { ProductType } from "../../types/productType";
import { mainColor } from "../../constants/colors";

import { moneyFormat } from "../../utils/handlers/moneyFormat";
import { setItem } from "../../utils/handlers/tokenHandler";

const ProductListItem = memo((product: ProductType) => {
  const navigate = useNavigate();
  const handleViewProduct = () => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 5,
        cursor: "pointer",
        width: "100%",
      }}
      onClick={handleViewProduct}
    >
      <Avatar
        src={product.images[0]}
        variant="square"
        sx={{ width: 80, height: 80 }}
      />
      <Box>
        <Typography fontSize={22} fontWeight={600} color={mainColor}>
          {product.title.length > 15
            ? product.title.slice(0, 15) + "..."
            : product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating value={product.averageStarRating} readOnly />
          <Typography>({product.comments.length})</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontSize={22} fontWeight={600} color={mainColor}>
            {moneyFormat(product.lastPrice)}/{product.unit}
          </Typography>
          <Typography
            sx={{ textDecoration: "line-through" }}
            fontWeight={600}
            color={"#999"}
          >
            {moneyFormat(product.price)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default ProductListItem;
