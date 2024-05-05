import { Box, IconButton, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { ContactDataType, FooterDataType } from "../../../types/dataTypes";
import { footerInfoData } from "./components/data";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Banner, Logo } from "../../../constants/images";
import { mainColor } from "../../../constants/colors";

const Footer = () => {
  const footerData: FooterDataType[] = [
    {
      icon: <LoyaltyIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Giá & ưu đãi đãi tốt nhất",
      subtitle: "Cho đơn hàng từ $50",
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Miễn phí vận chuyển",
      subtitle: "Dịch vụ tuyệt vời 24/7",
    },
    {
      icon: <RequestQuoteIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Ưu đãi hàng ngày",
      subtitle: "Khi bạn đăng ký",
    },
    {
      icon: <DynamicFeedIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Nhiều mặt hàng",
      subtitle: "Giảm giá cực lớn",
    },
    {
      icon: <AccountTreeIcon sx={{ fontSize: 40, color: mainColor }} />,
      title: "Dễ dàng hoàn trả",
      subtitle: "Trong vòng 30 ngày",
    },
  ];
  const contactData: ContactDataType[] = [
    {
      icon: <FacebookIcon />,
      title: "Facebook",
      url: "https://www.facebook.com/1150694301/",
    },
    {
      icon: <TwitterIcon />,
      title: "Twitter",
      url: "https://twitter.com/dat54261001",
    },
    {
      icon: <YouTubeIcon />,
      title: "Youtube",
      url: "https://www.youtube.com/channel/UCEt_3J34Gnx_HaWeMcCX9xw",
    },
    {
      icon: <InstagramIcon />,
      title: "Instagram",
      url: "",
    },
  ];

  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );

  return (
    <Box pt={5}>
      {/* banner */}
      <Box
        sx={{
          background: `url(${Banner}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: { sm: 400, xs: 200 },
          borderRadius: 5,
          pl: { sm: "600px", xs: 10 },
          pt: { sm: 10, xs: 2 },
        }}
      >
        <Typography
          fontSize={{ sm: 40, xs: 18 }}
          fontWeight={600}
          fontFamily={"Overpass"}
          color={"#fff"}
        >
          Ở nhà & đáp ứng nhu cầu hàng ngày của bạn từ cửa hàng của chúng tôi
        </Typography>
        <Typography py={2} color={"#fff"}>
          Bắt đầu mua sắm với chúng tôi
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          <input
            placeholder="Địa chỉ email của bạn"
            style={{
              borderRadius: 30,
              outline: "none",
              border: "none",
              padding: 10,
              width: window.innerWidth > 600 ? 350 : 190,
              height: 50,
              fontSize: window.innerWidth > 600 ? 20 : 17,
            }}
          />
          <Button
            color="success"
            variant="contained"
            sx={{ borderRadius: 30, fontSize: { xs: 10 } }}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>

      {/*  */}
      <Box
        display={"flex"}
        flexDirection={{ sm: "row", xs: "column" }}
        justifyContent={"space-between"}
        gap={2}
        py={5}
      >
        {footerData.map((data, index) => (
          <Box
            key={index}
            sx={{
              background: "#D2DFDC",
              p: 2,
              borderRadius: "10px",
              width: { sm: 300, xs: "100%" },
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {data.icon}
            <Box>
              <Typography fontWeight={600} fontSize={18}>
                {data.title}
              </Typography>
              <Typography variant="body2">{data.subtitle}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* info */}
      <Box
        display={"flex"}
        flexDirection={{ sm: "row", xs: "column" }}
        justifyContent={"space-between"}
        gap={3}
      >
        <Box>
          <img src={Logo} alt="logo" style={{ width: 200 }} />
          <Typography>Mẫu trang web cửa hàng tạp hóa tuyệt vời</Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <LocationOnIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Địa chỉ:</Typography>
            <Typography>17 Dang Thuy Tram, P17, Binh Thanh, HCMC</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <HeadphonesIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Gọi cho chúng tôi:</Typography>
            <Typography>0987654321</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <SendIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Email:</Typography>
            <Typography>dat54261001@gmail.com.com</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <AccessTimeIcon sx={{ color: mainColor }} />
            <Typography fontWeight={600}>Giờ làm việc:</Typography>
            <Typography></Typography>
          </Box>
        </Box>
        <Box
          width={{ sm: "60%", xs: "100%" }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {footerInfoData.map((data, index) => (
            <Box display={"flex"} flexDirection={"column"} gap={1} key={index}>
              <Typography fontWeight={600} fontSize={18}>
                {data.title}
              </Typography>
              {data.childrent.map((value: any, i: number) => (
                <Typography
                  key={i}
                  component={NavLink}
                  to={value.url}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      color: mainColor,
                    },
                  }}
                  fontSize={{ xs: 13 }}
                  color={"#000"}
                >
                  {value.item}
                </Typography>
              ))}
            </Box>
          ))}
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography fontWeight={600} fontSize={18}>
              Danh mục sản phẩm
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              maxHeight={200}
              overflow={"auto"}
            >
              {categories.map((category) => (
                <Typography
                  key={category._id!}
                  component={NavLink}
                  to={category.name}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      color: mainColor,
                    },
                  }}
                  fontSize={{ xs: 13 }}
                  color={"#000"}
                >
                  {category.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <hr color={mainColor} />
      {/* laster */}
      <Box
        display={"flex"}
        flexDirection={{ sm: "row", xs: "column-reverse" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography sx={{ fontSize: { sm: 16, xs: 12 } }}>
          Bản quyền @ 2023 FreshGreen. Phát triên bởi{" "}
          <a
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: mainColor,
            }}
            href="https://facebook.com/1150694301"
          >
            Bui Huu Dat
          </a>
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <PhoneInTalkOutlinedIcon sx={{ fontSize: 50 }} />
          <Box>
            <Typography color={mainColor} fontWeight={600} fontSize={20}>
              1900 - 1009
            </Typography>
            <Typography fontSize={12}>Trung tâm Hỗ trợ 24/7</Typography>
          </Box>
        </Box>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={3}
          >
            <Typography fontWeight={600}>Theo dõi chúng tôi</Typography>
            <Box>
              {contactData.map((value, index) => (
                <IconButton
                  key={index}
                  title={value.title}
                  color={"success"}
                  href={value.url}
                >
                  {value.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
          <Typography fontSize={12}>
            Giảm giá lên đến 15% cho lần đăng ký đầu tiên
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
