import { createSlice } from "@reduxjs/toolkit";
import { settingsActions } from "../../actions/settingsActionts";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialProps {
  banners: {
    images: Array<string>;
  };
  loading: boolean;
}

const initialState = {
  banners: {
    images: [],
  },
  loading: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(settingsActions.getBanner.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addMatcher<PendingAction>(
        (acction) => acction.type.endsWith("pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (acction) =>
          acction.type.endsWith("fulfiled") ||
          acction.type.endsWith("rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default settingsSlice.reducer;
