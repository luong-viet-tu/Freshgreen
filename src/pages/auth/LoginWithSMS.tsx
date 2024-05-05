import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";

import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch } from "../../redux/hooks";
import { mainColor } from "../../constants/colors";
import { LoginBg } from "../../constants/images";
import { authActions } from "../../actions/authActions";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { authAPI } from "../../utils/api/authApi";

interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}
declare var window: ExtendedWindow;

export default function LoginWithSMS() {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const recaptchaContainer = document.getElementById("recaptcha-container");

  const verifyCapcha = async () => {
    await authAPI
      .checkPhone(formatPhoneNumber(phone).replace(/\D/g, ""))
      .then(() => {
        if (recaptchaContainer && !recaptchaContainer.hasChildNodes()) {
          if (phone === "" || phone.length < 10) return;
          let verify = new RecaptchaVerifier(auth, recaptchaContainer, {
            size: "invisible",
            callback: () => {
              setVerify(true);
            },
          });

          signInWithPhoneNumber(auth, phone, verify)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
            })
            .catch(() => {
              NotificationToast({
                message:
                  "Bạn đã thực hiện hành động này nhiều lần, Vui lòng thử lại sau.",
                type: "error",
              });
              setVerify(false);
            });
        }
        return <div ref={recaptchaRef} id="recaptcha-container"></div>;
      })
      .catch((e) => {
        if (e.data.message) {
          return NotificationToast({ message: e.data.message, type: "error" });
        }
      });
  };

  const login = async () => {
    setLoading(true);

    window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        dispatch(
          authActions.sms(
            formatPhoneNumber(result.user.phoneNumber).replace(/\D/g, "")
          )
        )
          .unwrap()
          .then(() => {
            setLoading(false);
            navigate("/");
          })
          .catch((error: any) => {
            if (error.message) {
              NotificationToast({ message: error.message, type: "error" });
            }
            setVerify(false);
            setOtp("");
          });
      })
      .catch((error: any) => {
        NotificationToast({ message: "Đã xảy ra lỗi", type: "error" });
        setVerify(false);
        setOtp("");
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
      >
        <Typography fontWeight={600} fontSize={30}>
          Đăng nhập bằng SMS
        </Typography>

        <Box>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e!)}
            style={{
              width: 300,
              height: 60,
              fontSize: 18,
              borderRadius: 8,
            }}
            defaultCountry="VN"
          />
        </Box>

        <div id="recaptcha-container"></div>

        {verify ? (
          <Box>
            <TextField
              label="OTP"
              margin="normal"
              sx={{ width: { sm: 300, xs: "100%" } }}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <LoadingButton
              variant="contained"
              color="success"
              sx={{ mt: 2, width: { sm: 300, xs: "100%" } }}
              type="submit"
              onClick={login}
              loading={loading}
            >
              Đăng nhập
            </LoadingButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2, width: { sm: 300, xs: "100%" } }}
            type="submit"
            onClick={verifyCapcha}
            disabled={phone === ""}
          >
            Xác nhận
          </Button>
        )}
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
}
