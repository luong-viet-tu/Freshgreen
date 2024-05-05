import { useEffect } from "react";
import { Box } from "@mui/material";

import HomeSwiper from "./components/HomeSwiper";
import HomeFeaturedCategory from "./components/HomeFeaturedCategory";
import HomeAds from "./components/HomeAds";
import HomeProducts from "./components/HomeProducts";
import BestSellers from "./components/BestSellers";
import HomeSale from "./components/HomeSale";
import HomeList from "./components/HomeList";

import { productActions } from "../../actions/productActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { settingsActions } from "../../actions/settingsActionts";
import { categoryActions } from "../../actions/categoryActions";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    popular,
    bestSeller,
    productsView,
    ratedHighest,
    newProducts,
    biggestDiscount,
  } = useAppSelector((state: RootState) => state.product);
  const { images } = useAppSelector(
    (state: RootState) => state.settings.banners
  );
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    dispatch(productActions.popular());
    dispatch(productActions.getProductsView());
    dispatch(productActions.bestSeller());
    dispatch(productActions.newProducts());
    dispatch(productActions.ratedHighestProducts());
    dispatch(productActions.getBiggestDiscountProducts());
    dispatch(settingsActions.getBanner());
    dispatch(categoryActions.gets());
  }, [dispatch]);

  return (
    <Box>
      <HomeSwiper images={images} />
      {/* danh muc noi bat */}
      <HomeFeaturedCategory categories={categories} />

      {/*  ads */}
      <HomeAds />

      {/* home products */}
      <HomeProducts products={popular} />

      {/* deals of the day */}
      <BestSellers products={bestSeller} />

      {/* sale in day */}
      <HomeSale products={productsView} />

      {/* home list */}
      <HomeList
        bestSeller={bestSeller}
        popular={popular}
        bestRating={ratedHighest}
        newProducts={newProducts}
        biggestDiscount={biggestDiscount}
      />
    </Box>
  );
};

export default HomePage;
