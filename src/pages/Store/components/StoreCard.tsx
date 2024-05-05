import React from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { mainColor } from "../../../constants/colors";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { ShopType } from "../../../types/shopType";
import { StoreImage } from "../../../constants/images";
import { addressOfUser, phoneOfUser } from "../../../types/userType";
import MessageIcon from "@mui/icons-material/Message";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser, setPopup } from "../../../redux/slices/messageSlice";
import { RootState } from "../../../redux/store";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { messageActions } from "../../../actions/messageAction";

const StoreCard = ({ store }: { store: ShopType }) => {
  const navigate = useNavigate();
  const state = { shopId: store._id! } as NavigateOptions;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const storeImage = store.image ?? StoreImage;

  const handleMessage = () => {
    if (!user)
      return NotificationToast({
        message: "Bạn cần phải đăng nhập trước",
        type: "warning",
      });
    dispatch(
      selectUser({
        user: {
          _id: store._id!,
          name: store.name,
          avatar: storeImage,
        },
      })
    );
    dispatch(setPopup(true));
    dispatch(messageActions.get({ from: user?._id!, to: store._id! }));
  };

  const handleViewStore = () => {
    navigate(`/cua-hang/${store.name}`, { state });
  };

  return (
    <Paper
      sx={{
        width: { sm: 500, xs: "100%" },
        display: "flex",
        flexDirection: "row",
        gap: 3,
        p: 2,
        ":hover": { outline: `1px solid ${mainColor}` },
      }}
      elevation={8}
    >
      <Box>
        <img
          src={storeImage}
          alt={store.name}
          style={{
            width: window.innerWidth > 600 ? 200 : 100,
            height: window.innerWidth > 600 ? 200 : 100,
            objectFit: "cover",
          }}
        />
      </Box>

      <Box>
        <Typography fontWeight={600} color={"#555"} fontSize={15}>
          Kể từ {store.startYear}
        </Typography>
        <Typography fontWeight={600} fontSize={23}>
          {store.name}
        </Typography>
        <Box display={"flex"} pb={5}>
          <Rating name="read-only" value={store.star?.count} readOnly />
          <Typography>({store.averageStarRating})</Typography>
        </Box>

        <Typography>
          <LocationOnIcon sx={{ color: mainColor, fontSize: 18 }} />
          <b>Địa chỉ: </b>
          {addressOfUser(store?.user?.address!)}
        </Typography>
        <Typography>
          <LocalPhoneIcon sx={{ color: mainColor, fontSize: 18 }} />
          <b>Số điện thoại: </b>
          {phoneOfUser(store.user?.phone!)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
            gap: 2,
          }}
        >
          <Button color="success" variant="contained" onClick={handleViewStore}>
            Xem cửa hàng <ArrowRightAltIcon />
          </Button>
          <IconButton onClick={handleMessage}>
            <MessageIcon color="success" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default React.memo(StoreCard);
