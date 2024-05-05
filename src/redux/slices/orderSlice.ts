import { createSlice } from "@reduxjs/toolkit";
import { orderActions } from "../../actions/orderActions";
import { OrderItemType } from "../../types/orderType";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  data: OrderItemType[];
  loading: boolean;
}
const initialState: InitialStateProps = {
  data: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderActions.getOrders.fulfilled, (state, action) => {
        state.data = action.payload?.orders;
      })
      .addCase(orderActions.createOrder.fulfilled, (state, action) => {
        state.data?.push(action.payload);
      })
      .addCase(orderActions.deleteOrder.fulfilled, (state, action) => {
        if (action.payload.success) {
          const orderIndex = state.data.findIndex(
            (order) => order._id === action.meta.arg.orderId
          );
          state.data = state.data.splice(orderIndex, 1);
        }
      })
      .addCase(orderActions.submitStatusOrder.fulfilled, (state, action) => {
        if (action.payload.status) {
          const index = state.data.findIndex(
            (order) => order._id === action.payload.orderId
          );
          if (index !== -1) {
            state.data[index].status = action.payload.status;
          }
        }
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default orderSlice.reducer;
