import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { OrderItemType, OrderStatus } from "../../types/orderType";

import OrderItem from "./components/OrderItem";
import Tabs from "./components/Tabs";

const OrderManager = () => {
  const { data: dataOrder, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const user = useAppSelector((state: RootState) => state.user.user);

  const [value, setValue] = useState<OrderStatus>(OrderStatus.pending);
  const [orders, setOrders] = useState<OrderItemType[] | undefined>(dataOrder);

  useEffect(() => {
    setOrders(
      dataOrder?.filter(
        (order: OrderItemType) =>
          order.status !== OrderStatus.done && order.status === value
      )
    );
  }, [dataOrder, value]);

  return (
    <Box>
      {loading && <CircularProgress />}
      <Tabs value={value} setValue={setValue} />
      {!orders?.length ? (
        <Typography align="center" fontSize={23} fontWeight={600}>
          Chưa có đơn hàng
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {orders?.map((order: OrderItemType) => (
            <OrderItem order={order} user={user!} key={order._id} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrderManager;
