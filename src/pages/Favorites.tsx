import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { favoriteActions } from "../actions/favoriteActions";
import { RootState } from "../redux/store";
import ProductCard from "../components/common/ProductCard";
import { ProductType } from "../types/productType";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { favoriteProducts } = useAppSelector(
    (state: RootState) => state.favorite
  );

  useEffect(() => {
    dispatch(favoriteActions.get(user?._id as string));
  }, [dispatch, user?._id]);

  return favoriteProducts.length ? (
    <Box display={"flex"} flexDirection={"row"} gap={5} flexWrap={"wrap"}>
      {favoriteProducts.map((product: ProductType, index: number) => (
        <ProductCard product={product} key={index} />
      ))}
    </Box>
  ) : (
    <Box display={"flex"} justifyContent={"center"}>
      <Typography fontWeight={600} fontSize={32}>
        Chưa có sản phẩm
      </Typography>
    </Box>
  );
};

export default Favorites;
