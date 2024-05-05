import { useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
import { Box, LinearProgress, Typography } from "@mui/material";
import { OrderStatus } from "../types/orderType";
import OrderItem from "./OrderManeger/components/OrderItem";
// import Pagini from "../components/Pagini";

const Bought = () => {
  const { data, loading } = useAppSelector((state) => state.order);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const { user } = useAppSelector((state) => state.user);
  const orders = useMemo(
    () => data?.filter((order) => order.status === OrderStatus.done),
    [data]
  );
  return loading ? (
    <LinearProgress />
  ) : (
    <div>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {!orders?.length ? (
          <Typography
            sx={{ textAlign: "center", fontSize: 22, fontWeight: 600 }}
          >
            Chưa có đơn mua
          </Typography>
        ) : (
          orders?.map((order) => (
            <OrderItem order={order} user={user!} key={order._id} />
          ))
        )}
      </Box>
      {/* <Pagini countPage={1} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
};

export default Bought;
