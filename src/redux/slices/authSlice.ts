import { createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  errors: any;
  loading: boolean;
  modal: {
    open: boolean;
    data?: string;
    message: string;
  };

  capchaModal: {
    open: boolean;
  };
}

const initialState: InitialStateProps = {
  errors: null,
  loading: false,
  modal: {
    open: false,
    data: undefined,
    message: "",
  },
  capchaModal: {
    open: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginModal: (state, action) => {
      state.modal = action.payload;
    },
    setCapchaModal: (state, action) => {
      state.capchaModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(authActions.login.rejected, (state, action) => {
      //   state.errors = action.payload;
      // })
      // .addCase(authActions.google.rejected, (state, action) => {
      //   state.errors = action.payload;
      // })
      // .addCase(authActions.register.rejected, (state, action) => {
      //   state.errors = action.payload;
      // })
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

export const { setLoginModal, setCapchaModal } = authSlice.actions;
export default authSlice.reducer;
