import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { memo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import commentActions from "../../../../actions/commentActions";
import { RootState } from "../../../../redux/store";
import { NotificationToast } from "../../../../utils/handlers/NotificationToast";
import Rate from "./Rate";

interface CommentActionsProps {
  productId: string;
  commentId?: string;
  commentTime?: string;
}

const CommentActions = memo((props: CommentActionsProps) => {
  const { productId, commentId } = props;
  const [content, setContent] = useState<string>("");
  const user = useAppSelector((state: RootState) => state.user.user);
  const [value, setValue] = useState<number | null>(5);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!user?._id) {
      return NotificationToast({
        message: "Yêu cầu đăng nhập!",
        type: "warning",
      });
    }
    dispatch(
      commentActions.addComment({
        userId: user?._id!,
        productId,
        content,
        commentId,
        rate: Number(value),
      })
    );

    setContent("");
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        m: "0 auto",
        p: { sm: 2, xs: 1 },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          size="small"
          sx={{ display: "flex", flexDirection: "row", gap: 1 }}
          color="success"
        >
          <Avatar src={user?.avatar} alt={user?.username} />
          <Typography fontSize={16} fontWeight={600}>
            {user?.fullname.firstname} {user?.fullname.lastname}
          </Typography>
        </Button>

        <Rate value={value} setValue={setValue} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <TextField
          variant="standard"
          name="comment"
          value={content}
          fullWidth
          onChange={(e) => setContent(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={handleSubmit}
          disabled={content === ""}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
});

export default CommentActions;
