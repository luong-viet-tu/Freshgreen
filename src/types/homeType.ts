import { Autoplay, FreeMode } from "swiper/modules";

export type CustomSwiperProps = {
  spaceBetween: number;
  loop: boolean;
  autoplay: {
    delay: number;
    disableOnInteraction: boolean;
  };
  modules?: (typeof Autoplay)[];
};

export type FeaturedCategoryDataType = {
  image: string;
  title: string;
  count?: number;
  color?: string;
};

export type HomeAdsDataType = {
  image: string;
  title: string;
  category: string;
};

export type DealsOfTheDayType = {
  spaceBetween: number;
  slidesPerView: number;
  watchSlidesProgress: boolean;
  freeMode: boolean;
  centeredSlides: boolean;
  loop: boolean;
  autoplay: {
    delay: number;
    disableOnInteraction: boolean;
  };
  modules?: [typeof Autoplay, typeof FreeMode];
};

export type SaleDataType = {
  image: string;
  title: string;
  countStar: number;
  shop: string;
  price: number;
  discount: number;
  active: boolean;
  url?: string;
};
