import { useMemo } from "react";
import { Box, Typography, createStyles } from "@mui/material";
import moment from "moment";

import { OrderItemType, PayMethod } from "../../../types/orderType";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { mainColor } from "../../../constants/colors";

const billInfoItem = createStyles({
  display: "flex",
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
});

const BillInfo = (order: OrderItemType) => {
  const countProduct: number = useMemo(
    () => order.products.reduce((prev, p) => prev + p.count, 0),
    [order.products]
  );

  return (
    <Box sx={{ p: 1 }}>
      <hr />
      <Box sx={billInfoItem}>
        <Typography>Tình trạng đơn hàng</Typography>
        <Typography
          fontWeight={600}
          color={"primary"}
          sx={{ p: 0.3, outline: "1px solid #ddd", borderRadius: 5 }}
        >
          {order.status}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Thời gian đặt hàng</Typography>
        <Typography fontWeight={600}>
          {moment(order.createdAt).format("D-MMMM-YYYY, h:mm:ss a")}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Số lượng sản phẩm:</Typography>
        <Typography fontWeight={600}>{countProduct}</Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Voucher sử dụng:</Typography>
        <Typography fontWeight={600}>
          {order.voucherUsed.voucher || "Không sử dụng"}
        </Typography>
        <Typography fontWeight={600} color={mainColor} fontSize={20}>
          {order.voucherUsed.discount !== 0
            ? `${order.voucherUsed.discount}%`
            : ""}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Tổng số tiền:</Typography>
        <Typography fontSize={23} color={mainColor} fontWeight={600}>
          {moneyFormat(order.totalPrice)}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Phương thức thanh toán:</Typography>
        <Typography fontWeight={600}>
          {order.pay.method === PayMethod.payNow
            ? "Thanh toán trực tuyến"
            : "Thanh toán khi nhận hàng"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BillInfo;
