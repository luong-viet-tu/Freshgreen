import {
  AddCommentProps,
  DeleteCommentProps,
  ReactCommentProps,
} from "../../actions/commentActions";
import axiosClient from "./axiosClient";

const commentApi = {
  getProductComment: (productTitle: string) =>
    axiosClient.get(`/comments/${productTitle}`),

  addComment: ({
    productId,
    userId,
    content,
    commentId,
    rate,
  }: AddCommentProps) =>
    axiosClient.post(`/comments/product/${productId}/user/${userId}`, {
      content,
      commentId,
      rate,
    }),

  reactComment: ({ commentId, reaction, auth }: ReactCommentProps) =>
    axiosClient.put(`/comments/${commentId}/reaction`, {
      reaction,
      auth,
    }),

  deleteComment: ({ commentId, productId }: DeleteCommentProps) =>
    axiosClient.patch(`/comments/${commentId}`, { productId }),
};

export default commentApi;
