import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { CategoryType } from "../../../types/categoryType";
import { DealsOfTheDayType } from "../../../types/homeType";

interface Props {
  categories: Array<CategoryType>;
}

const HomeFeaturedCategory = memo((props: Props) => {
  const { categories } = props;
  const navigate = useNavigate();

  const customSwiper: DealsOfTheDayType = {
    spaceBetween: 30,
    slidesPerView: 8,
    watchSlidesProgress: false,
    freeMode: true,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
  };

  const handleViewProduct = (category: CategoryType) => {
    navigate("/san-pham", { state: category });
  };

  return (
    <Box py={5} display={{ xs: "none", sm: "block" }}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Danh mục nổi bật
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={{ xs: 2, sm: 5 }}
        p={{ xs: 2, sm: 3 }}
        sx={{
          width: { xs: "max-content", sm: "100%" },
          overflowX: { xs: "auto", sm: "none" },
        }}
      >
        <Swiper
          {...customSwiper}
          style={{
            width: "100%",
          }}
        >
          {categories.map((category) => (
            <SwiperSlide
              style={{ display: "block", width: 600 }}
              key={category._id!}
            >
              <Box
                sx={{
                  width: { xs: 150, sm: 200 },
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{ width: "100%", height: 150, cursor: "pointer" }}
                  onClick={() => handleViewProduct(category)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography fontWeight={600} align="center" fontSize={18}>
                  {category.name}
                </Typography>
                <Typography align="center" fontSize={14}>
                  {/* {category.count} mục */}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
});

export default HomeFeaturedCategory;
