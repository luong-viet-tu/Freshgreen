import { memo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { Banner2 } from "../../../constants/images";
import ProductCard from "../../../components/common/ProductCard";
import SkeletonCard from "../../../components/SkeletonCard";
import { DealsOfTheDayType } from "../../../types/homeType";
import { ProductType } from "../../../types/productType";

const BestSellers = memo(({ products }: { products: Array<ProductType> }) => {
  const customSwiper: DealsOfTheDayType = {
    spaceBetween: 30,
    slidesPerView: window.innerWidth > 600 ? 4 : 1,
    watchSlidesProgress: false,
    freeMode: true,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
  };
  const navigate = useNavigate();

  return (
    <Box py={3}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Bán chạy nhất trong ngày
      </Typography>
      <Box
        display={"flex"}
        flexDirection={{ sm: "row", xs: "column" }}
        justifyContent={"space-between"}
        gap={5}
      >
        <Box
          borderRadius={5}
          p={5}
          pt={{ sm: 60, xs: 50 }}
          width={{ sm: "25%", xs: "100%" }}
          height={{ sm: 700, xs: "100%" }}
          sx={{
            background: `url(${Banner2}) no-repeat`,
            backgroundSize: 300,
            backgroundColor: "#A7E6C4",
          }}
        >
          <Typography fontWeight={600} fontSize={30}>
            Khám khá thêm những sản phẩm mới
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("san-pham")}
          >
            Mua ngay <ArrowRightAltIcon />
          </Button>
        </Box>

        <Box width={{ sm: "70%", xs: "100%" }}>
          {products.length ? (
            <Swiper
              {...customSwiper}
              style={{
                width: "100%",
              }}
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product._id!}
                  style={{ display: "block", width: 600 }}
                >
                  <ProductCard product={product} width={280} fast={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box
              display={"flex"}
              flexDirection={{ sm: "row", xs: "column" }}
              gap={5}
            >
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default BestSellers;
