import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

import { LoginBg } from "../../constants/images";
import { mainColor } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { authActions } from "../../actions/authActions";
import { NotificationToast } from "../../utils/handlers/NotificationToast";

const ResetPassword = () => {
  const [errText, setErrText] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const verifyEmail = async () => {
    dispatch(authActions.resetPassword({ email }))
      .unwrap()
      .then(() => {
        NotificationToast({
          message: "Một mật khẩu mới đã được gửi tới email của bạn",
          type: "success",
        });
        setErrText("");
      })
      .catch((err: any) => {
        if (err.message) setErrText(err.message);
      });
  };

  return (
    <Box
      display={{ sm: "flex", xs: "column" }}
      flexDirection={"row"}
      justifyContent={"space-around"}
    >
      <img
        src={LoginBg}
        alt="login bg"
        style={window.innerWidth < 600 ? { width: "100%" } : {}}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={{ sm: 500, xs: "100%" }}
        component={"form"}
        // onSubmit={verifyEmail}
      >
        <Typography fontWeight={600} fontSize={30}>
          Quên mật khẩu
        </Typography>
        <TextField
          label="Email"
          name="email"
          margin="normal"
          sx={{ width: { sm: 400, xs: "100%" } }}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errText !== ""}
          helperText={errText}
        />

        <LoadingButton
          variant="contained"
          color="success"
          sx={{ mt: 2, width: { sm: 400, xs: "100%" } }}
          // type="submit"
          onClick={verifyEmail}
          loading={loading}
        >
          Xác nhận
        </LoadingButton>
        <Link
          to={"/dang-nhap"}
          style={{
            fontWeight: 600,
            color: mainColor,
            paddingTop: 10,
            textDecoration: "none",
          }}
        >
          Quay lại trang Đăng nhập
        </Link>
        <Typography>
          Bạn chưa có tài khoản?{" "}
          <Link
            to={"/dang-ky"}
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: mainColor,
            }}
          >
            Đăng ký ngay
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
