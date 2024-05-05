import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { HomeAdsData } from "./data/HomeData";

const HomeAds = () => {
  const navidation = useNavigate();
  return (
    <Box
      py={3}
      display={"flex"}
      flexDirection={{ sm: "row", xs: "column" }}
      justifyContent={"space-around"}
      gap={5}
    >
      {HomeAdsData.map((data, index) => (
        <Box
          key={index}
          borderRadius={3}
          height={250}
          width={380}
          sx={{
            background: `url(${data.image}) center`,
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{ backdropFilter: "blur(5px)", width: "100%", height: "100%" }}
            p={5}
            borderRadius={3}
          >
            <Typography fontWeight={600} fontSize={22}>
              {data.title}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={() => navidation(`san-pham/:${data.category}`)}
            >
              <Typography fontWeight={600} fontSize={12}>
                Mua ngay
              </Typography>
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomeAds;
