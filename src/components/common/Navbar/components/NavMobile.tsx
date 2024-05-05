import { Button, Chip, Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../../constants/images";
import { navbarDataItem } from "./Data/NavbarDataItem";
import { NavbarDataType } from "../../../../types/dataTypes";
import { profileData } from "../../../../pages/Profile/components/Data";
import { UserType } from "../../../../types/userType";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout } from "../../../../redux/slices/userSlice";
import { clearCart } from "../../../../redux/slices/cartSlice";
import { clearFavorite } from "../../../../redux/slices/favoriteSlice";

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  user: UserType;
}

const drawerWidth = 240;

const NavMobile = (props: Props) => {
  const { window, mobileOpen, handleDrawerToggle, user } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFavorite());
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt="logo"
        style={{
          width: 100,
          height: "auto",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />
      <Divider />
      <List>
        {navbarDataItem.map(
          (data: NavbarDataType) =>
            data.show && (
              <ListItem
                key={data.item}
                disablePadding
                onClick={() => navigate(data.path)}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={data.item} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      {user?._id && (
        <>
          <Divider>
            <Chip label="Người dùng" />
          </Divider>
          <List>
            {profileData.map((data) => (
              <ListItem
                key={data.name}
                disablePadding
                onClick={() => navigate(data.path)}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={data.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout <LogoutIcon />
          </Button>
        </>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default NavMobile;
