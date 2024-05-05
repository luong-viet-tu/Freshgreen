import { memo, useContext, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { NotificationToast } from "../../../../utils/handlers/NotificationToast";
import { RootState } from "../../../../redux/store";
import { CommentType } from "../../../../types/commentType";

import commentActions from "../../../../actions/commentActions";
import Rate from "./Rate";
import CommentActions from "./CommentActions";
import { CommentContext } from "../DetailActions";

const CommentItem = memo((comment: CommentType) => {
  const [isShowRepBox, setIsShowRepBox] = useState(false);
  const [value, setValue] = useState<number | null>(5);

  const user = useAppSelector((state: RootState) => state.user.user);
  const product = useContext(CommentContext);
  const dispatch = useAppDispatch();
  const isLiked = comment.reaction.filter((rt) => rt === user?._id).length;
  // const isCommented = comment.auth._id === user?._id;

  const handleReply = () => {
    if (!user?._id) {
      return NotificationToast({
        message: "Yêu cầu đăng nhập!",
        type: "warning",
      });
    }
    setIsShowRepBox(!isShowRepBox);
  };

  const handleLike = (reaction: "Like" | "Unlike") => {
    if (!user?._id) {
      return NotificationToast({
        message: "Yêu cầu đăng nhập!",
        type: "warning",
      });
    }
    dispatch(
      commentActions.reactCommentActions({
        auth: user?._id as string,
        commentId: comment._id as string,
        reaction,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      commentActions.deleteComment({
        commentId: comment._id as string,
        productId: product._id as string,
      })
    );
  };

  return (
    <Paper elevation={9} key={comment._id}>
      <Box margin={"0 auto"} p={1}>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              flexDirection={{ sm: "row", xs: "column" }}
              alignItems={"center"}
              pb={1}
              gap={3}
            >
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Button
                  size="small"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                  color="success"
                >
                  <Avatar src={comment.auth?.avatar} />
                  <Typography fontSize={16} fontWeight={600}>
                    {`${comment.auth?.fullname.firstname ?? ""} ${
                      comment.auth?.fullname.lastname ?? "Ẩn danh"
                    }`}
                  </Typography>
                </Button>
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 600,
                    fontSize: 14,
                    fontStyle: "italic",
                  }}
                >
                  {"- " + moment(comment.createdAt).calendar()}
                </Typography>
              </Box>

              <Rate
                value={comment.rate || value}
                setValue={setValue}
                isDisable={true}
              />
            </Box>

            <Box display={"flex"} gap={2}>
              {product.shop?._id === user?._id && (
                <Box>
                  <Button onClick={handleDelete} color="error">
                    Delete <DeleteIcon />
                  </Button>
                  <Button onClick={handleReply}>
                    reply <ReplyIcon />
                  </Button>
                </Box>
              )}
              {isLiked ? (
                <IconButton size="small" onClick={() => handleLike("Unlike")}>
                  <Badge badgeContent={comment.reaction.length} color="primary">
                    <ThumbUpIcon
                      sx={{ width: 30, height: 30 }}
                      color={"success"}
                    />
                  </Badge>
                </IconButton>
              ) : (
                <IconButton size="small" onClick={() => handleLike("Like")}>
                  <ThumbUpOffAltIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box>
            <Typography>{comment.content}</Typography>
            {isShowRepBox && (
              <CommentActions
                productId={product._id as string}
                commentId={comment._id as string}
                commentTime={comment.createdAt}
              />
            )}

            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <CommentItem {...reply} key={reply._id} />
              ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

export default CommentItem;
