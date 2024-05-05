import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoginModal } from "../../redux/slices/authSlice";
import { LoginType } from "../../types/authType";
import { mainColor } from "../../constants/colors";
import { authActions } from "../../actions/authActions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 550,
  p: 4,
  borderRadius: 5,
};

const InitialErrText: { phone: string; password: string } = {
  phone: "",
  password: "",
};

export const LoginModal = () => {
  const { loading, modal } = useAppSelector((state) => state.auth);
  const { open, data: email, message } = modal;
  const [isShowPass, setIsShowPass] = useState(false);
  const [errText, setErrText] = useState(InitialErrText);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClose = () => dispatch(setLoginModal(false));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginType = {
      username: email ?? (formData.get("username") as string),
      password: formData.get("password") as string,
    };

    dispatch(authActions.login(data))
      .unwrap()
      .then(() => {
        dispatch(setLoginModal({ open: false, message: "", data: "" }));
        navigate("/");
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case "phone":
                setErrText((prev) => ({
                  ...prev,
                  phone: e.msg,
                }));
                break;
              case "password":
                setErrText((prev) => ({
                  ...prev,
                  password: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });

    setErrText(InitialErrText);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography fontWeight={600} fontSize={30}>
            Đăng nhập
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {message}
          </Typography>

          <TextField
            label="Email"
            name="email"
            margin="normal"
            defaultValue={email}
            value={email}
            sx={{ width: { sm: 400, xs: "100%" } }}
            required
            error={errText.phone !== ""}
            helperText={errText.phone}
          />

          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={1}
            alignItems={"center"}
          >
            <TextField
              label="Mật khẩu"
              name="password"
              margin="normal"
              type={isShowPass ? "text" : "password"}
              autoComplete="false"
              sx={{ width: { sm: 400, xs: "100%" } }}
              required
              error={errText.password !== ""}
              helperText={errText.password}
            />
            <IconButton onClick={() => setIsShowPass(!isShowPass)}>
              <RemoveRedEyeIcon
                sx={{ color: isShowPass ? mainColor : "normal" }}
              />
            </IconButton>
          </Box>
          <LoadingButton
            variant="contained"
            color="success"
            sx={{ mt: 2, width: { sm: 400, xs: "100%" } }}
            type="submit"
            loading={loading}
          >
            Đăng nhập
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
};
