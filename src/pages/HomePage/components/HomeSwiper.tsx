import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { CustomSwiperProps } from "../../../types/homeType";

const HomeSwiper = memo(({ images }: { images: Array<string> }) => {
  const swiperProps: CustomSwiperProps = {
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
  };

  return (
    <>
      <Swiper {...swiperProps} className="rounded">
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              style={{
                width: "100%",
                height: 400,
                objectFit: "contain",
                borderRadius: 5,
              }}
              src={image}
              alt="123"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});

export default HomeSwiper;
