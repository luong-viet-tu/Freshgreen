import { Avatar, Box, Paper, Typography } from "@mui/material";
import { UserType, fullnameOfUser } from "../../../../types/userType";

interface Props {
  fromSelf: boolean;
  message: string;
  reveicer: any;
  user: UserType;
}

const MessageItem = (props: Props) => {
  const { message, fromSelf, reveicer, user } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fromSelf ? "end" : "start",
        pb: 2,
      }}
    >
      <Paper elevation={5} sx={{ width: "max-content" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            padding: 1,
            flexDirection: fromSelf ? "row-reverse" : "row",
          }}
        >
          <Avatar
            src={fromSelf ? user?.avatar : reveicer?.avatar}
            alt={"avatar"}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: fromSelf ? "end" : "start",
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              {fromSelf
                ? user
                  ? fullnameOfUser(user.fullname)
                  : "Khách"
                : reveicer.name}
            </Typography>
            <Typography textAlign={"justify"}>{message}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageItem;
