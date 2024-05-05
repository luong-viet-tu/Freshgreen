import { createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../utils/api/commentApi";

export interface AddCommentProps {
  userId: string;
  productId: string;
  content: string;
  commentId?: string;
  rate: number;
}

export interface DeleteCommentProps {
  commentId: string;
  productId: string;
}

export interface ReactCommentProps {
  commentId: string;
  reaction: "Like" | "Unlike";
  auth: string;
}

const commentActions = {
  getProductComments: createAsyncThunk(
    "comment/product/gets",
    async (productTitle: string) => {
      try {
        const res = await commentApi.getProductComment(productTitle);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  addComment: createAsyncThunk<any, AddCommentProps>(
    "comment/add",
    async ({ userId, productId, content, commentId, rate }) => {
      try {
        const res = await commentApi.addComment({
          userId,
          productId,
          content,
          commentId,
          rate,
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  reactCommentActions: createAsyncThunk<ReactCommentProps, ReactCommentProps>(
    "comment/react",
    async ({ commentId, reaction, auth }) => {
      try {
        const res = await commentApi.reactComment({
          commentId,
          reaction,
          auth,
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  deleteComment: createAsyncThunk<{ commentId: string }, DeleteCommentProps>(
    "comment/delete",
    async ({ commentId, productId }) => {
      try {
        const res = await commentApi.deleteComment({ commentId, productId });
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
};

export default commentActions;
