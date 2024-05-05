import { memo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";

import { OrderItemType, OrderStatus } from "../../../types/orderType";
import { UserType } from "../../../types/userType";
import { useAppDispatch } from "../../../redux/hooks";
import { orderActions } from "../../../actions/orderActions";
import { socket } from "../../../utils/api/socketConfirm";

interface Props {
  order: OrderItemType;
  user: UserType;
}
const OrderActions = memo((props: Props) => {
  const { order, user } = props;
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await dispatch(
      orderActions.submitStatusOrder({
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.done,
      })
    )
      .unwrap()
      .then(() => {
        socket.emit("access-order");
        setIsLoading(false);
      });
  };
  const handleRefure = async () => {
    if (message.length < 5) {
      setMessageErr("Lý do không hợp lệ");
      return;
    }
    setIsLoading(true);
    await dispatch(
      orderActions.submitStatusOrder({
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.refuse,
        message,
      })
    )
      .unwrap()
      .then(() => {
        socket.emit("refuse-order");
        setIsLoading(false);
      });
    setMessageErr("");
    setShow(false);
  };

  // const handleDeleteOrder = () => {
  //   dispatch(
  //     orderActions.deleteOrder({
  //       userId: user._id as string,
  //       orderId: order._id as string,
  //     })
  //   );
  // };

  return order.status === OrderStatus.pending ? (
    <Box sx={{ display: "flex", gap: 1, p: 1, flexDirection: "column" }}>
      {!show ? (
        <Button
          fullWidth
          color="error"
          variant="outlined"
          onClick={() => setShow(!show)}
        >
          Hủy đơn hàng
        </Button>
      ) : (
        <Box>
          <TextField
            name="message"
            label="message"
            onChange={(e) => setMessage(e.target.value)}
            required
            fullWidth
            error={messageErr !== ""}
            helperText={messageErr}
          />
          <Box display={"flex"} flexDirection={"row"}>
            <LoadingButton
              fullWidth
              color="warning"
              variant="outlined"
              onClick={() => setShow(false)}
              loading={isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="error"
              variant="contained"
              onClick={handleRefure}
              loading={isLoading}
            >
              Xác nhận
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  ) : order.status === OrderStatus.access ? (
    <Box>
      <Button variant="text" fullWidth color="success" disabled>
        Đang giao hàng
      </Button>
      <LoadingButton
        variant="contained"
        fullWidth
        color="success"
        onClick={handleSubmit}
        loading={isLoading}
      >
        Đã nhận được hàng
      </LoadingButton>
    </Box>
  ) : order.status === OrderStatus.done ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 1 }}>
      <Button variant="contained" fullWidth color="primary">
        Mua lại
      </Button>
      {/* <Button
        variant="outlined"
        fullWidth
        color="error"
        onClick={handleDeleteOrder}
      >
        Xoá đơn hàng
      </Button> */}
    </Box>
  ) : (
    <Box p={1}>
      <Button variant="text" fullWidth color="error" disabled>
        Đã hủy
      </Button>
      <Typography>
        Lí do:{" "}
        <b style={{ color: "red" }}>
          <i>{order.message}</i>
        </b>
      </Typography>
    </Box>
  );
});

export default OrderActions;
