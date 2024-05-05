import { useEffect, useRef, useState } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import MessageItem from "./MessageItem";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { messageActions } from "../../../../actions/messageAction";
import { NotificationToast } from "../../../../utils/handlers/NotificationToast";
import { dataMessage } from "./data";
import { mainColor } from "../../../../constants/colors";

const Chat = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const {
    user: data,
    userChat,
    aiChat,
    loading,
  } = useAppSelector((state: RootState) => state.messages);

  useEffect(() => {
    const chatContainer = messagesEndRef.current;
    if (chatContainer) {
      const isUserAtBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;

      if (isUserAtBottom) {
        chatContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [userChat, loading]);

  const handleSend = () => {
    setMessage("");
    if (data.user._id === "AI") {
      dispatch(messageActions.ask({ userId: user?._id!, message }));
    } else {
      if (!user)
        return NotificationToast({
          message: "Bạn cần phải đăng nhập trước",
          type: "warning",
        });
      dispatch(
        messageActions.send({
          user,
          from: user?._id!,
          to: data.user._id,
          message: {
            text: message,
          },
        })
      );
    }
  };

  return (
    <Box pl={2} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>to: </Typography>
          <Typography fontWeight={600}>{data.user.name}</Typography>
        </Box>
        <Divider variant="middle" />
      </Box>
      <Box sx={{ flex: 1, padding: 3, overflow: "auto", height: "80%" }}>
        {(data.user._id === "AI" ? aiChat : userChat).map((chat, index) => (
          <MessageItem
            key={index}
            {...chat}
            reveicer={data.user}
            user={user!}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      {data.user._id === "AI" && (
        <Box display={"flex"} flexWrap={"wrap"}>
          {dataMessage.map((mess, i) => (
            <Typography
              onClick={() =>
                !loading &&
                dispatch(
                  messageActions.ask({ userId: user?._id!, message: mess })
                )
              }
              key={i}
              sx={{
                padding: 1,
                fontSize: 12,
                width: "max-content",
                borderRadius: "50px",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: mainColor,
                cursor: "pointer",
              }}
            >
              {mess}
            </Typography>
          ))}
        </Box>
      )}
      <Box sx={{ mt: "auto", width: "100%", display: "flex" }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          value={message}
          label="Đặt câu hỏi..."
          variant="filled"
        />
        <LoadingButton onClick={handleSend} loading={loading}>
          <SendIcon />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Chat;
