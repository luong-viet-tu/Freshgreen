import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { ProductCartType } from "../../../types/cartType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { cartActions } from "../../../actions/cartActions";
import { RootState } from "../../../redux/store";
import { setItem } from "../../../utils/handlers/tokenHandler";

const CartProductItem = memo(({ product }: { product: ProductCartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const handleUp = () => {
    dispatch(
      cartActions.upCountProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };
  const handleDown = () => {
    dispatch(
      cartActions.downCountProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };
  const handleDeleteProduct = () => {
    dispatch(
      cartActions.removeProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };

  const handleViewProduct = () => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: { sm: 1, xs: 0 },
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { sm: 5, xs: 2 },
        }}
      >
        <img
          src={product?.images[0]}
          alt={product.title}
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography
            fontWeight={600}
            fontSize={{ sm: 23, xs: 16 }}
            textTransform={"capitalize"}
            sx={{ cursor: "pointer" }}
            onClick={handleViewProduct}
          >
            {product.title}
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={{ sm: 8, xs: 2 }}
            alignItems={"center"}
            flexWrap={{ sm: "nowrap", xs: "wrap" }}
            p={1}
          >
            <Typography
              fontSize={{ sm: 20, xs: 13 }}
              fontWeight={600}
              color={"orange"}
              sx={{ width: 100 }}
            >
              {product.discount > 0 && `-${product.discount}%`}
            </Typography>
            <Typography
              color={"#999"}
              sx={{ textDecoration: "line-through", width: 100 }}
            >
              {product.discount > 0 && `${moneyFormat(product.price)}`}
            </Typography>
            <Typography
              fontSize={{ sm: 25, xs: 13 }}
              color={"#62BD19"}
              fontWeight={600}
              sx={{ width: { sm: 150, xs: 50 } }}
              align="right"
            >
              {moneyFormat(product.lastPrice)}/{product.unit}
            </Typography>

            <Box display={"flex"} gap={1}>
              <IconButton color="warning" onClick={handleDown}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ width: 30 }}>{product.count}</Typography>
              <IconButton color="primary" onClick={handleUp}>
                <AddIcon />
              </IconButton>
            </Box>

            <Typography
              fontSize={{ sm: 35, xs: 25 }}
              fontWeight={600}
              color={"#333"}
              sx={{ width: { sm: 150, xs: 200 } }}
              align="right"
            >
              {moneyFormat(product.count * product.lastPrice)}
            </Typography>

            <IconButton color="error" onClick={handleDeleteProduct}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

export default CartProductItem;
