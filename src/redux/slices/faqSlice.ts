import { createSlice } from "@reduxjs/toolkit";
import { faqActions } from "../../actions/faqActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

export interface FaqDataItem {
  title: string;
  cards: [{ header: string; body: string }];
}

interface FAQStateProps {
  data?: FaqDataItem[];
  loading: boolean;
}
const initialState: FAQStateProps = {
  loading: false,
};

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(faqActions.gets.fulfilled, (state, action) => {
        state.data = action.payload;
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

export default faqSlice.reducer;
