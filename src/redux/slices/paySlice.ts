import { createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  amount: number;
  loading: boolean;
  modal: {
    data: any;
    open: boolean;
  };
}

const initialState: InitialStateProps = {
  amount: 0,
  loading: false,
  modal: {
    data: {},
    open: false,
  },
};

export const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    setPayMethod: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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

export const { setPayMethod } = paySlice.actions;
export default paySlice.reducer;
