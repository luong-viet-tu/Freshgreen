import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderActions } from "../../actions/orderActions";
import { OrderItemType } from "../../types/orderType";
import { moneyFormat } from "../../utils/handlers/moneyFormat";
import { getItem, removeItem } from "../../utils/handlers/tokenHandler";

const VNPayThank = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  const user = useAppSelector((state) => state.user.user);

  const createNewOrder = async (storedOrder: OrderItemType) => {
    await dispatch(
      orderActions.createOrder({ userId: user?._id!, order: storedOrder })
    )
      .unwrap()
      .then(() => {
        removeItem("order");
        window.location.reload();
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!search) {
      return navigate("/");
    }

    const urlSearchParams = new URLSearchParams(search);
    const vnp_ResponseCode = urlSearchParams.get("vnp_ResponseCode");

    if (vnp_ResponseCode === null || vnp_ResponseCode !== "00") {
      return navigate("/");
    }

    const vnp_Amount = urlSearchParams.get("vnp_Amount");
    setAmount(+vnp_Amount! / 100);

    try {
      const storedOrder: OrderItemType = getItem("order");

      if (storedOrder) {
        createNewOrder(storedOrder);
      } else {
        return navigate("/");
      }
    } catch (error) {
      console.error("Error parsing stored order:", error);
      return navigate("/");
    }
  }, [search, navigate]);

  return isLoading ? (
    <CircularProgress color="success" />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Typography sx={{ mt: 10 }} align="center">
        Cảm ơn bạn đã thanh toán {moneyFormat(amount)}
      </Typography>

      <Button
        variant="outlined"
        color="success"
        onClick={() => navigate("/quan-li-don-hang")}
      >
        Quản lý đơn hàng
      </Button>
    </Box>
  );
};

export default VNPayThank;
