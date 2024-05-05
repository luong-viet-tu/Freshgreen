import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { LoginBg } from "../../constants/images";
import { mainColor } from "../../constants/colors";
import { RegisterType } from "../../types/authType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authActions } from "../../actions/authActions";
import { RootState } from "../../redux/store";

interface InitialErrTextProps {
  fistname: string;
  lastname: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const InitialErrText: InitialErrTextProps = {
  fistname: "",
  lastname: "",
  phone: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const [errText, setErrText] = useState(InitialErrText);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: RegisterType = {
      fullname: {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
      },
      username: formData.get("username") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    let error = false;

    if (
      data.fullname.firstname.length < 2 ||
      data.fullname.firstname.length > 7
    ) {
      setErrText((prev) => ({
        ...prev,
        fistname: "Họ không hợp lệ",
      }));
      error = true;
    }
    if (
      data.fullname.lastname.length < 2 ||
      data.fullname.lastname.length > 7
    ) {
      setErrText((prev) => ({
        ...prev,
        lastname: "Tên không hợp lệ",
      }));
      error = true;
    }

    if (data.username.length < 6) {
      setErrText((prev) => ({
        ...prev,
        username: "Tài khoản yêu cầu tối thiểu là 6 ký tự",
      }));
      error = true;
    }
    if (data.phone.length < 10 || data.phone.length > 11) {
      setErrText((prev) => ({
        ...prev,
        phone: "Số điện thoại không hợp lệ",
      }));
      error = true;
    }
    if (data.email.length > 100) {
      setErrText((prev) => ({
        ...prev,
        email: "Email không hợp lệ",
      }));
      error = true;
    }
    if (data.password.length < 8) {
      setErrText((prev) => ({
        ...prev,
        password: "Mật khẩu yêu cầu tối thiểu là 8 ký tự",
      }));
      error = true;
    }
    if (data.password !== data.confirmPassword) {
      setErrText((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không khớp",
      }));
      error = true;
    }

    if (error) return;
    setErrText(InitialErrText);

    await dispatch(authActions.register(data))
      .unwrap()
      .then(() => {
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
              case "email":
                setErrText((prev) => ({
                  ...prev,
                  email: e.msg,
                }));
                break;
              case "username":
                setErrText((prev) => ({
                  ...prev,
                  username: e.msg,
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
        onSubmit={handleSubmit}
      >
        <Typography fontWeight={600} fontSize={30}>
          Đăng ký
        </Typography>
        <Box width={{ sm: 400, xs: "100%" }} display={"flex"} gap={2}>
          <TextField
            label="Họ"
            name="firstname"
            margin="normal"
            error={errText.fistname !== ""}
            helperText={errText.fistname}
          />
          <TextField
            label="Tên"
            name="lastname"
            margin="normal"
            error={errText.lastname !== ""}
            helperText={errText.lastname}
          />
        </Box>
        <TextField
          label="Email"
          name="email"
          margin="normal"
          type="email"
          required
          sx={{ width: { sm: 400, xs: "100%" } }}
          error={errText.email !== ""}
          helperText={errText.email}
        />
        <TextField
          label="Tài khoản"
          name="username"
          margin="normal"
          sx={{ width: { sm: 400, xs: "100%" } }}
          error={errText.username !== ""}
          helperText={errText.username}
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          margin="normal"
          sx={{ width: { sm: 400, xs: "100%" } }}
          error={errText.phone !== ""}
          helperText={errText.phone}
        />
        <TextField
          label="Mật khẩu"
          name="password"
          margin="normal"
          type="password"
          autoComplete="false"
          sx={{ width: { sm: 400, xs: "100%" } }}
          error={errText.password !== ""}
          helperText={errText.password}
        />
        <TextField
          label="Xác nhận Mật khẩu"
          name="confirmPassword"
          margin="normal"
          type="password"
          autoComplete="false"
          sx={{ width: { sm: 400, xs: "100%" } }}
          error={errText.confirmPassword !== ""}
          helperText={errText.confirmPassword}
        />

        <LoadingButton
          variant="contained"
          color="success"
          sx={{ mt: 2, width: { sm: 400, xs: "100%" } }}
          type="submit"
          loading={loading}
        >
          Đăng ký
        </LoadingButton>
        <Typography sx={{ pt: 2 }}>
          Bạn đã có tài khoản?{" "}
          <Link
            to={"/dang-nhap"}
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: mainColor,
            }}
          >
            Đăng nhập ngay
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
