import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import CartProductItem from "./components/CartProductItem";
import { ProductCartType } from "../../types/cartType";
import PayInformation from "./components/PayInformation";
import PayMethodModal from "../../components/common/PayMethodModal";

const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cart.data);

  return (
    <Box>
      <Typography align="center" fontWeight={600} fontSize={{ sm: 32, xs: 20 }}>
        {!cart.products.length
          ? "Giỏ hàng trống"
          : ` Có ${cart.products.length} sản phẩm trong giỏ hàng`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          justifyContent: "space-between",
        }}
      >
        <Box
          height={505}
          width={{ sm: "70%", xs: "100%" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: { sm: 3, xs: 1 },
            my: { sm: 5, xs: 2 },
            overflowY: "auto",
          }}
        >
          {cart?.products &&
            cart.products.map((product: ProductCartType) => (
              <CartProductItem product={product} key={product._id} />
            ))}
        </Box>

        {cart.products.length > 0 && <PayInformation />}
      </Box>
      <PayMethodModal />
    </Box>
  );
};

export default Cart;
