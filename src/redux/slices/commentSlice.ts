import { createSlice } from "@reduxjs/toolkit";
import commentActions from "../../actions/commentActions";
import { CommentType } from "../../types/commentType";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import _ from "lodash";

interface InitialProps {
  comments: CommentType[];
  loading: boolean;
}

const initialState: InitialProps = {
  comments: [],
  loading: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentActions.getProductComments.fulfilled, (state, action) => {
        state.comments = _.orderBy(action.payload, ["createdAt"], "desc");
      })
      .addCase(commentActions.addComment.fulfilled, (state, action) => {
        if (action.meta.arg?.commentId) {
          const index = state.comments.findIndex(
            (comment) => comment._id === action.payload._id
          );
          if (index === -1) return;
          state.comments[index] = action.payload;
        } else {
          state.comments.unshift(action.payload);
        }
      })
      .addCase(
        commentActions.reactCommentActions.fulfilled,
        (state, action) => {
          const index = state.comments.findIndex(
            (comment) => comment._id === action.payload.commentId
          );
          const { auth, reaction } = action.meta.arg;

          if (index !== -1) {
            const comment = state.comments[index];
            if (reaction === "Like") {
              state.comments[index] = {
                ...comment,
                reaction: [...comment.reaction, auth],
              };
            } else {
              const indexOfReact = comment.reaction.findIndex(
                (r) => r === auth
              );
              comment.reaction.splice(indexOfReact, 1);
            }
          }
        }
      )
      .addCase(commentActions.deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfiled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default commentSlice.reducer;
