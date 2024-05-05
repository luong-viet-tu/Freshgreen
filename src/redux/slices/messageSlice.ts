import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { messageActions } from "../../actions/messageAction";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialProp {
  popup: boolean;
  user: any;
  aiChat: Array<{
    fromSelf: boolean;
    message: string;
  }>;
  userChat: Array<{
    fromSelf: boolean;
    message: string;
  }>;
  loading: boolean;
}

const initialState: InitialProp = {
  popup: false,
  user: {
    user: {
      _id: "",
      name: "",
      avatar: "",
    },
    lastMessage: "",
    time: "",
    seen: false,
  },

  aiChat: [],

  userChat: [],

  loading: false,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(messageActions.ask.fulfilled, (state, action) => {
        state.aiChat.push(action.payload);
      })
      .addCase(messageActions.send.fulfilled, (state, action) => {
        state.userChat.push(action.payload);
      })
      .addCase(messageActions.get.fulfilled, (state, action) => {
        state.userChat = action.payload;
      })
      .addMatcher(
        isAnyOf(messageActions.ask.pending, messageActions.ask.rejected),
        (state, action) => {
          state.aiChat.push({
            fromSelf: true,
            message: action.meta.arg.message,
          });
        }
      )
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

export const { selectUser, setPopup } = messageSlice.actions;
export default messageSlice.reducer;
