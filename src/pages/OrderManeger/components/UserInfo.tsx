import { useNavigate } from "react-router-dom";
import { Avatar, Box, Skeleton, Typography, createStyles } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { UserType } from "../../../types/userType";

const userInforItem = createStyles({
  display: "flex",
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
});

interface UserInfoProps {
  user: UserType;
  address: string;
  isLoading: boolean;
}

const UserInfo = ({ user, address, isLoading }: UserInfoProps) => {
  const navigate = useNavigate();
  const viewUser = () => {
    navigate(`/tai-khoan/${user._id}`);
  };

  return !isLoading ? (
    <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
      <Avatar
        src={user.avatar}
        alt={user.username}
        sx={{
          width: window.innerWidth > 600 ? 80 : 50,
          height: window.innerWidth > 600 ? 80 : 50,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box width={"80%"}>
        <Box sx={userInforItem}>
          <PersonIcon color="success" />
          <Typography fontWeight={600} onClick={viewUser}>
            {user.fullname.firstname + " " + user.fullname.lastname}
          </Typography>
        </Box>
        <Box sx={userInforItem}>
          <PhoneIcon color="success" />
          <Typography fontWeight={600}>{user.phone}</Typography>
        </Box>
        <Box sx={userInforItem}>
          <EmailIcon color="success" />
          <Typography fontWeight={600}>{user.email}</Typography>
        </Box>
        <Box sx={userInforItem}>
          <LocationOnIcon color="success" />
          <Typography sx={{ wordWrap: "break-word" }} fontWeight={600}>
            {address}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
      <Skeleton
        variant="circular"
        width={70}
        height={70}
        sx={{ borderRadius: "50%" }}
      />
      <Box width={"80%"}>
        <Skeleton variant="text" height={20} width="70%" />
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
        <Skeleton variant="text" height={20} width="70%" />
      </Box>
    </Box>
  );
};

export default UserInfo;
