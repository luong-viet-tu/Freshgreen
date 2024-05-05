import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";

import Navbar from "../common/Navbar";
import Directory from "../common/Directory";
import Footer from "../common/Footer";

import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { clearStorage, getItem } from "../../utils/handlers/tokenHandler";
import { socket } from "../../utils/api/socketConfirm";
import { requestPermissionNotification } from "../../utils/handlers/getFCMToken";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (getItem("user")) {
          const user = await verifyToken();
          if (user) {
            socket.emit("user-login", user._id!);
            requestPermissionNotification(user._id);
            navigate("/");
          }
        } else {
          setIsLoading(false);
          clearStorage();
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress color="success" />}>
      <Box px={{ sm: 10, xs: 2 }}>
        <Navbar />
        <Box minHeight={"100vh"} pt={{ sm: 15, xs: 10 }}>
          {pathname !== "/" && <Directory />}
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Suspense>
  );
};

export default AuthLayout;
