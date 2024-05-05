import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";

import { setItem } from "../../utils/handlers/tokenHandler";
import { payApi } from "../../utils/api/payApi";

const MomoMethod = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!state || !state.order) return navigate("/gio-hang");
  }, [navigate, state]);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const res = await payApi.momoMethod(state.order.totalPrice);
      setItem("order", state.order);
      if (res.data && res.data?.payUrl) {
        return window.location.replace(res.data.payUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography align="center" fontSize={25} fontWeight={600}>
        Thanh Toán bằng Momo
      </Typography>
      <LoadingButton
        loading={isLoading}
        onClick={handlePay}
        variant="contained"
        sx={{
          background: "#d82b8d",
          ":hover": {
            background: "#d82b8d",
            color: "#fff",
          },
        }}
      >
        Thanh Toán ngay
      </LoadingButton>
    </Box>
  );
};

export default MomoMethod;
