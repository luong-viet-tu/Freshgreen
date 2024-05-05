import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProvince } from "../../utils/api/getProvince";
import { userActions } from "../../actions/userActions";
import { AddressForm, AddressProps } from "./components/AddressForm";
import VerifyPhoneModal from "./components/VerifyPhoneModal";
import { RootState } from "../../redux/store";
import { logout, userChangeAvatar } from "../../redux/slices/userSlice";
import { UserType } from "../../types/userType";
import { getBaseImage } from "../../utils/handlers/getBaseImage";
import { imageUpload } from "../../utils/handlers/imageUploadCloud";
import { ProfileDataProps, profileData } from "./components/Data";
import { mainColor } from "../../constants/colors";
import { clearCart } from "../../redux/slices/cartSlice";
import { clearFavorite } from "../../redux/slices/favoriteSlice";
import { clearStorage } from "../../utils/handlers/tokenHandler";
import { userApi } from "../../utils/api/userApi";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { NotificationToast } from "../../utils/handlers/NotificationToast";

interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}
declare var window: ExtendedWindow;

const initialErrText: {
  phone: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
} = {
  phone: "",
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmPassword: "",
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const { pathname } = useLocation();
  const recaptchaRef = useRef(null);
  const recaptchaContainer = document.getElementById("recaptcha-container");

  const { user, isLoading } = useAppSelector((state: RootState) => state.user);

  const [errText, setErrText] = useState(initialErrText);
  const [open, setOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [imageSelected, setImageSelected] = useState<string>("");
  const [avatarChanging, setAvatarChanging] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [code, setCode] = useState("");
  const [formCode, setFormCode] = useState(false);
  const [address, setAddress] = useState<AddressProps>(
    {
      city: user?.address?.city || "",
      district: user?.address?.district || "",
      ward: user?.address?.ward || "",
      street: user?.address?.street || "",
      more: user?.address?.more || "",
    } || user?.address
  );
  const [locationData, setLocationData] = useState<{
    provinces: { name: string }[];
    districts: { name: string }[];
    wards: { name: string }[];
  }>({
    provinces: [],
    districts: [],
    wards: [],
  });

  const userVerified = useMemo(
    () => user?.verifyPhone && user?.verifyEmail,
    [user]
  );

  // get provider
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await getProvince();
        setLocationData((prevData) => ({
          ...prevData,
          provinces: data,
        }));
        setDataAddress(data);
      } catch (e) {
        throw e;
      }
    };
    getProvinces();
  }, [isDisable]);

  // get cities, wards, disticts
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const matchingDataCity: any = dataAddress.find(
        (data: any) => data.name === address.city
      );

      if (matchingDataCity) {
        setLocationData((prevData) => ({
          ...prevData,
          districts: matchingDataCity.districts,
        }));
      }
    }

    if (locationData.districts && locationData.districts.length > 0) {
      const matchingDataDistrict: any = locationData.districts.find(
        (data: any) => data.name === address.district
      );

      if (matchingDataDistrict) {
        setLocationData((prevData) => ({
          ...prevData,
          wards: matchingDataDistrict.wards,
        }));
      }
    }
  }, [address, dataAddress, locationData.districts]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data: UserType = {
      _id: user?._id,
      username: (formData.get("username") as string) || user?.username!,
      phone:
        (formData.get("phone") as string) ||
        (user?.phone.includes("social") ? "" : user?.phone!),
      email: (formData.get("email") as string) || user?.email!,
      password: formData.get("password") as string,
      fullname: {
        firstname:
          (formData.get("firstname") as string) || user?.fullname?.firstname!,
        lastname:
          (formData.get("lastname") as string) || user?.fullname?.lastname!,
      },
      address,
    };

    let err: boolean = false;

    if (data.password !== formData.get("confirmPassword")) {
      setErrText((prev) => ({
        ...prev,
        confirmPassword: "Mật khâu không khớp",
      }));
      err = true;
    }

    if (err) return;
    setErrText(initialErrText);

    dispatch(userActions.userUpdate(data))
      .unwrap()
      .then(() => {
        setIsDisable(false);
      })
      .catch((err: any) => {
        err?.errors &&
          err?.errors?.forEach((e: any) => {
            switch (e.path) {
              case "fullname.firstname":
                setErrText((prev) => ({
                  ...prev,
                  firstname: e.msg,
                }));
                break;
              case "fullname.lastname":
                setErrText((prev) => ({
                  ...prev,
                  lastname: e.msg,
                }));
                break;
              case "username":
                setErrText((prev) => ({
                  ...prev,
                  username: e.msg,
                }));
                break;
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

  const handleDisable = useCallback(() => {
    setIsDisable(!isDisable);
  }, [isDisable]);

  const handleChange = (name: string, value: string) => {
    setAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle update avatar user
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAvatarChanging(true);
    const baseImage = await getBaseImage(e);
    if (baseImage && baseImage.length > 0) {
      const result = await imageUpload(baseImage[0].data);
      try {
        await userActions.changeAvatar({
          _id: user?._id,
          image: result,
        });
        dispatch(
          userChangeAvatar({ _id: user?._id as string, avatar: result })
        );
        setImageSelected(result);
      } catch (error) {
      } finally {
        setAvatarChanging(false);
      }
    }
  };

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFavorite());
    clearStorage();
    navigate("/");
  };

  const sendCode = async () => {
    await userApi.sendCodeEmail(user?.email!).then(() => setFormCode(true));
  };

  const handleVerifyEmail = () => {
    dispatch(userActions.verifyEmail({ email: user?.email!, code }))
      .unwrap()
      .then(() => setFormCode(false));
  };

  const verifyCapcha = async () => {
    if (recaptchaContainer && !recaptchaContainer.hasChildNodes()) {
      let verify = new RecaptchaVerifier(auth, recaptchaContainer, {
        size: "invisible",
        callback: () => {},
      });

      signInWithPhoneNumber(auth, `+84 ${+user?.phone!}`, verify)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOpen(true);
        })
        .catch(() => {
          NotificationToast({
            message:
              "Bạn đã thực hiện hành động này nhiều lần, Vui lòng thử lại sau.",
            type: "error",
          });
        });
    }
    return <div ref={recaptchaRef} id="recaptcha-container"></div>;
  };

  const handleVerify = (otp: number) => {
    window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        dispatch(userActions.verifyPhone(user?.phone!))
          .unwrap()
          .then(() => setOpen(false));
      })
      .catch((e: any) => {
        NotificationToast({ message: "Mã không đúng", type: "error" });
      });
  };

  return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
      <Paper
        sx={{
          width: "15%",
          height: "max-content",
          p: 3,
          mt: 5,
          display: { sm: "block", xs: "none" },
        }}
        elevation={8}
      >
        {profileData.map((data: ProfileDataProps, index) => (
          <Box mb={3} key={index}>
            <Typography
              sx={{
                cursor: "pointer",
                color: pathname === data.path ? mainColor : "#555",
              }}
              fontWeight={600}
              onClick={() => navigate(data.path)}
            >
              {data.name}
            </Typography>
            <hr />
          </Box>
        ))}

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout <LogoutIcon />
        </Button>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          width: { sm: "70%", xs: "100%" },
        }}
      >
        <input
          accept="image/*"
          id="contained-button-file"
          hidden
          type="file"
          onChange={onChangeImage}
          multiple={false}
        />
        {avatarChanging ? (
          <Box sx={{ mx: "auto", width: 150, height: 160 }}>
            <Typography>Đang cập nhật ảnh đại diện</Typography>
            <CircularProgress />
          </Box>
        ) : (
          <IconButton
            sx={{ width: "max-content", mx: "auto", cursor: "pointer" }}
            color="success"
          >
            <label htmlFor="contained-button-file">
              <Avatar
                src={imageSelected || user?.avatar}
                alt={user?.fullname?.firstname}
                sx={{ width: 150, height: 150, cursor: "pointer" }}
              />
            </label>
          </IconButton>
        )}

        {/* <Typography>({user?.role})</Typography> */}

        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          mx={"auto"}
        >
          <Typography fontSize={32}>
            Hello {user?.fullname?.firstname} {user?.fullname?.lastname}
          </Typography>
          {userVerified && (
            <VerifiedIcon
              color="primary"
              titleAccess="Người dùng đã xác minh."
            />
          )}
        </Box>

        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { sm: 500, xs: "100%" },
            justifyContent: "center",
            textAlign: "center",
            mx: "auto",
          }}
        >
          <Box
            display={"flex"}
            flex={"row"}
            gap={2}
            justifyContent={"space-between"}
          >
            <TextField
              name="firstname"
              label="First Name"
              margin="normal"
              required
              disabled={!isDisable}
              defaultValue={user?.fullname?.firstname}
              error={errText.firstname !== ""}
              helperText={errText.firstname}
            />
            <TextField
              name="lastname"
              label="Last Name"
              margin="normal"
              disabled={!isDisable}
              required
              defaultValue={user?.fullname?.lastname}
              error={errText.lastname !== ""}
              helperText={errText.lastname}
            />
          </Box>
          <TextField
            fullWidth
            name="username"
            disabled={!isDisable}
            label="Username"
            defaultValue={user?.username}
            margin="normal"
            required
            error={errText.username !== ""}
            helperText={errText.username}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              name="phone"
              label={`Phone ${
                user?.verifyPhone ? "(Đã xác minh)" : "(Chưa xác minh)"
              }`}
              defaultValue={
                user?.phone.split("#").includes("social") ? "" : user?.phone
              }
              margin="normal"
              required
              disabled={!isDisable}
              error={errText.phone !== ""}
              helperText={errText.phone}
            />
            {!user?.verifyPhone &&
              !user?.phone.split("#").includes("social") && (
                <Button
                  onClick={verifyCapcha}
                  variant="outlined"
                  sx={{ display: isDisable ? "block" : "none" }}
                >
                  Xác minh
                </Button>
              )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              name="email"
              label={`Email ${
                user?.verifyEmail ? "(Đã xác minh)" : "(Chưa xác minh)"
              }`}
              defaultValue={user?.email}
              margin="normal"
              required
              disabled={!isDisable}
              error={errText.email !== ""}
              helperText={errText.email}
            />

            {formCode && (
              <TextField
                sx={{ width: 180 }}
                name="email"
                label={"Nhập code"}
                margin="normal"
                onChange={(e) => setCode(e.target.value)}
              />
            )}
            {!user?.verifyEmail && !formCode && (
              <Button
                variant="outlined"
                sx={{ display: isDisable ? "block" : "none" }}
                onClick={sendCode}
              >
                Gửi mã
              </Button>
            )}
            {!user?.verifyEmail && formCode && (
              <Button
                variant="outlined"
                sx={{ display: isDisable ? "block" : "none" }}
                onClick={handleVerifyEmail}
              >
                Xác minh
              </Button>
            )}
          </Box>
          {isDisable && (
            <Box>
              <TextField
                name="password"
                label="Password"
                margin="normal"
                fullWidth
                error={errText.password !== ""}
                helperText={errText.password}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                margin="normal"
                error={errText.confirmPassword !== ""}
                helperText={errText.confirmPassword}
              />
            </Box>
          )}

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={2}
            pt={2}
          >
            <AddressForm
              name="City"
              data={locationData.provinces}
              address={address}
              setAddress={setAddress}
              handleChange={(n, v) => handleChange(n, v)}
              disabled={!isDisable}
            />
            <AddressForm
              name="District"
              data={locationData.districts}
              address={address}
              setAddress={setAddress}
              handleChange={(n, v) => handleChange(n, v)}
              disabled={!isDisable}
            />
            <AddressForm
              name="Ward"
              data={locationData.wards}
              address={address}
              setAddress={setAddress}
              handleChange={(n, v) => handleChange(n, v)}
              disabled={!isDisable}
            />
            <TextField
              sx={{ width: { xs: "45%" } }}
              label="Street"
              name="street"
              defaultValue={user?.address?.street || address.street}
              onChange={(e) =>
                setAddress((prevData) => ({
                  ...prevData,
                  street: e.target.value,
                }))
              }
              disabled={!isDisable}
            />
            <TextField
              label="More"
              name="more"
              fullWidth
              defaultValue={address?.more || address.more}
              onChange={(e) =>
                setAddress((prevData) => ({
                  ...prevData,
                  more: e.target.value,
                }))
              }
              disabled={!isDisable}
            />

            {isDisable && (
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Update
              </LoadingButton>
            )}

            <LoadingButton
              variant="contained"
              color="warning"
              onClick={handleDisable}
              fullWidth
            >
              {!isDisable ? "Edit" : "Cancel"}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
      <div id="recaptcha-container"></div>

      <VerifyPhoneModal
        loading={isLoading}
        open={open}
        setOpen={setOpen}
        onVerify={handleVerify}
      />
    </Box>
  );
};

export default Profile;
