import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { mainColor } from "../../constants/colors";
import { ProductType } from "../../types/productType";
import { moneyFormat } from "../../utils/handlers/moneyFormat";
import { setItem } from "../../utils/handlers/tokenHandler";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { cartActions } from "../../actions/cartActions";

const ProductSaleCard = memo(({ product }: { product: ProductType }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const ms = 1;
  const [time, setTime] = useState({
    d: ms * 60 * 60 * 24,
    h: ms * 60 * 60,
    m: ms * 60,
    s: ms,
  });

  var countDownDate = new Date("Feb 10, 2024 00:00:00").getTime();

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setTime((prev) => ({
        ...prev,
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      }));
    }, 1000);
  }, [countDownDate]);

  const handleViewProduct = () => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };

  const handleAddCart = useCallback(() => {
    if (!user) {
      NotificationToast({ message: "Bạn chưa đăng nhập", type: "warning" });
      return false;
    }
    dispatch(
      cartActions.addProductToCart({
        userId: user._id!,
        product: { ...product, count: 1 },
      })
    );
  }, [product, user, dispatch]);

  return (
    <Box
      width={400}
      height={400}
      mb={8}
      sx={{
        background: `url(${product.images[0]}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
      borderRadius={10}
    >
      <Box
        sx={{
          display: "flex",
          pt: 25,
        }}
      >
        <Box
          sx={{
            mx: "auto",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            gap={2}
          >
            <Paper sx={{ width: 60 }}>
              <Typography
                color={mainColor}
                fontWeight={600}
                align="center"
                fontSize={32}
              >
                {time.d}
              </Typography>
              <Typography color={"#555"} fontSize={15} align="center">
                Ngày
              </Typography>
            </Paper>
            <Paper sx={{ width: 60 }}>
              <Typography
                color={mainColor}
                fontWeight={600}
                align="center"
                fontSize={32}
              >
                {time.h}
              </Typography>
              <Typography color={"#555"} fontSize={15} align="center">
                Giờ
              </Typography>
            </Paper>
            <Paper sx={{ width: 60 }}>
              <Typography
                color={mainColor}
                fontWeight={600}
                align="center"
                fontSize={32}
              >
                {time.m}
              </Typography>
              <Typography color={"#555"} fontSize={15} align="center">
                Phút
              </Typography>
            </Paper>
            <Paper sx={{ width: 60 }}>
              <Typography
                color={mainColor}
                fontWeight={600}
                align="center"
                fontSize={32}
              >
                {time.s}
              </Typography>
              <Typography color={"#555"} fontSize={15} align="center">
                Giây
              </Typography>
            </Paper>
          </Box>
          <Paper sx={{ mt: 2, p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              onClick={handleViewProduct}
              fontWeight={600}
              fontSize={18}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#000",
                height: 45,
              }}
            >
              {product.title}
            </Typography>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Rating
                name="half-rating"
                defaultValue={product.averageStarRating}
                precision={0.5}
                readOnly
              />
              <Typography fontSize={12} color={"#555"}>
                {" "}
                {/* ({product.comments.length}) */}
              </Typography>
            </Box>
            <Typography fontWeight={14}>
              Bán bởi
              <b
                style={{ color: mainColor, cursor: "pointer" }}
                onClick={() =>
                  navigate("cua-hang/" + product.shop ?? "", {
                    state: product.shop?._id,
                  })
                }
              >
                {" "}
                {product.shop?.name || ""}
              </b>
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Typography fontWeight={600} fontSize={30}>
                  {moneyFormat(product.lastPrice)}/{product.unit}
                </Typography>
                {product.discount > 0 && (
                  <Typography
                    sx={{ textDecoration: "line-through", color: "#ddd" }}
                  >
                    {moneyFormat(product.price)}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleAddCart}
              >
                <AddShoppingCartIcon />
                Thêm
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
});

export default ProductSaleCard;
