import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ProductType } from "../../types/productType";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addProductCompare } from "../../redux/slices/compareSlice";
import { cartActions } from "../../actions/cartActions";
import { favoriteActions } from "../../actions/favoriteActions";

import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { setItem } from "../../utils/handlers/tokenHandler";
import { moneyFormat } from "../../utils/handlers/moneyFormat";

import { mainColor, secColor } from "../../constants/colors";
interface ProductCardType {
  product: ProductType;
  fast?: boolean;
  width?: number;
}

const ProductCard = memo(
  ({ product, fast = false, width = 400 }: ProductCardType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state: RootState) => state.user.user)?._id!;
    const isComapring = useAppSelector(
      (state: RootState) => state.compare.isComparing
    );
    const favoriteProducts = useAppSelector(
      (state: RootState) => state.favorite.favoriteProducts
    );
    const isFavorite = favoriteProducts.filter(
      (p) => p._id === product._id
    ).length;

    const handleAddCart = useCallback(() => {
      if (!userId) {
        NotificationToast({ message: "Bạn chưa đăng nhập", type: "warning" });
        return false;
      }
      dispatch(
        cartActions.addProductToCart({
          userId,
          product: { ...product, count: 1 },
        })
      );
    }, [product, userId, dispatch]);

    const handleAddFavorite = () => {
      if (!userId) {
        NotificationToast({ message: "Bạn chưa đăng nhập", type: "warning" });
        return false;
      }
      dispatch(
        favoriteActions.update({
          userId: userId as string,
          product,
        })
      );
    };

    const handleCompare = () => {
      dispatch(addProductCompare(product));
    };

    const handleViewShop = () => {
      navigate("/cua-hang/" + product.shop?.name, {
        state: product.shop?._id,
      });
      setItem("productId", product.shop?._id);
    };

    const handleViewProduct = () => {
      navigate(`/san-pham/details/` + product.title, {
        state: { productId: product._id as string },
      });
      setItem("productId", product._id);
    };

    return (
      <Paper
        variant="outlined"
        sx={{
          ":hover": {
            outline: `1px solid ${mainColor}`,
          },
          borderRadius: 5,
          width: { sm: width, xs: 370 },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          height={35}
        >
          {product?.discount > 0 && (
            <Typography
              p={1}
              fontSize={12}
              bgcolor={secColor}
              sx={{
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                width: 60,
                color: "white",
                fontWeight: 600,
              }}
              align="center"
            >
              -{product.discount}%
            </Typography>
          )}

          {/* product fast */}
          {fast && (
            <Typography
              p={1}
              fontSize={12}
              bgcolor={mainColor}
              sx={{
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                width: 120,
                color: "white",
                fontWeight: 600,
                right: 0,
                float: "right",
                ml: "auto",
              }}
              align="center"
            >
              đã bán: {product.totalSales}
            </Typography>
          )}
        </Box>

        <img
          src={product.images[0]}
          alt={product.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width,
            height: "auto",
            objectFit: "cover",
          }}
        />

        <Box p={2} display={"flex"} flexDirection={"column"} gap={1}>
          <Typography
            fontSize={11}
            color={"#555"}
            sx={{ textTransform: "capitalize" }}
          >
            {product.category}
          </Typography>
          <Typography
            onClick={handleViewProduct}
            fontWeight={600}
            fontSize={18}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#000",
              height: 45,
              textTransform: "capitalize",
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
              ({product?.comments?.length})
            </Typography>
          </Box>
          {!product?.shop ? (
            <Skeleton width={100} height={20} />
          ) : (
            <Typography fontSize={13} color={"#555"}>
              Bán bởi
              <b
                style={{
                  color: mainColor,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
                onClick={handleViewShop}
              >
                {" "}
                {product.shop.name}
              </b>
            </Typography>
          )}

          {/* price */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            height={80}
          >
            <Typography fontSize={30} color={mainColor} fontWeight={600}>
              {moneyFormat(product.lastPrice)}/{product.unit}
            </Typography>
            <Typography
              sx={{
                fontSize: 25,
                color: "#ddd",
                textDecoration: "line-through",
              }}
            >
              {product.discount > 0 ? moneyFormat(product.price) : ""}
            </Typography>
          </Box>
        </Box>

        <Box
          p={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
        >
          <IconButton
            color="primary"
            title="So sánh"
            onClick={handleCompare}
            disabled={isComapring}
          >
            <ShuffleIcon />
          </IconButton>
          <IconButton
            color="error"
            title="Thêm sản phẩm yêu thích"
            onClick={handleAddFavorite}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button variant="outlined" color="success" onClick={handleAddCart}>
            <AddShoppingCartIcon /> Thêm
          </Button>
        </Box>
      </Paper>
    );
  }
);

export default ProductCard;
