import { memo } from "react";
import { Box, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { blue } from "@mui/material/colors";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { mainColor } from "../../../constants/colors";
import { PayDataProps } from "../../../types/payType";

const BillPay = memo((props: PayDataProps) => {
  const { pathname } = useLocation();

  const method = pathname.split("/")[3].toUpperCase() || "online";
  return (
    <Box sx={{ p: 3 }}>
      <Typography fontSize={32} fontWeight={500} pb={2}>
        Hóa đơn
      </Typography>

      <Box display={"flex"} flexDirection={"row"} my={1} gap={1}>
        <Typography fontSize={{ sm: 18, xs: 15 }} color={"#555"}>
          Tên người nhận:
        </Typography>
        <Typography fontSize={{ sm: 18, xs: 15 }} fontWeight={600}>
          {props.nameOfUser}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"row"} my={1} gap={1}>
        <Typography fontSize={{ sm: 18, xs: 15 }} color={"#555"}>
          Số điện thoại nhận hàng:{" "}
        </Typography>
        <Typography fontSize={{ sm: 18, xs: 15 }} fontWeight={600}>
          {props.phone}
        </Typography>
      </Box>
      {/* dia chi giao hang */}
      <Box display={"flex"} flexDirection={"column"} my={1}>
        <Typography fontSize={18} color={"#555"}>
          Địa chỉ nhận hàng:
        </Typography>
        <Typography fontSize={{ sm: 18, xs: 15 }} fontWeight={600}>
          {props.address} (
          <Link href="/tai-khoan" sx={{ fontWeight: 300, color: blue }}>
            chỉnh sửa
          </Link>
          )
        </Typography>
      </Box>

      <hr />

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={{ sm: 18, xs: 16 }} color={"#555"}>
          Tổng tiền hàng:
        </Typography>
        <Typography fontWeight={600} fontSize={18}>
          {moneyFormat(props.totalPrice)}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={{ sm: 18, xs: 16 }} color={"#555"}>
          Phí giao hàng:
        </Typography>
        <Typography my={2} fontWeight={600} fontSize={18}>
          {moneyFormat(props.totalPrice > 50000 ? 0 : 25000)}
        </Typography>
      </Box>
      {props.discount && props.discount.discount !== 0 && (
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={{ sm: 22, xs: 16 }} color={"#555"}>
              Voucher:
            </Typography>
            <Typography fontSize={{ sm: 22, xs: 16 }} fontWeight={600}>
              {props?.discount.voucher}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={{ sm: 22, xs: 16 }} color={"#555"}>
              Giảm:
            </Typography>
            <Typography
              fontSize={{ sm: 22, xs: 16 }}
              fontWeight={600}
              color={mainColor}
            >
              {props?.discount.discount}%
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={{ sm: 24, xs: 18 }} color={"#555"}>
          Tổng thanh toán:
        </Typography>
        <Typography fontSize={24} fontWeight={600} color={mainColor}>
          {moneyFormat(props.amount)}
        </Typography>
      </Box>

      <hr />

      <Box display={"flex"} flexDirection={"row"} my={1} gap={1}>
        <Typography fontSize={15} color={"#555"}>
          Phương thức thanh toán
        </Typography>
        <Typography fontSize={{ sm: 16, xs: 14 }} fontWeight={600}>
          Thanh toán {method} (
          <Link href="/gio-hang" sx={{ fontWeight: 300, color: blue }}>
            thay đổi
          </Link>
          )
        </Typography>
      </Box>
    </Box>
  );
});

export default BillPay;
