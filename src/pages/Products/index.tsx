import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { productActions } from "../../actions/productActions";
import ProductList from "./components/ProductList";
import BoxFilter from "./components/BoxFilter";
import Pagini from "../../components/Pagini";
import { ProductType } from "../../types/productType";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, totalProducts } = useAppSelector(
    (state: RootState) => state.product
  );
  const numberOfProductShow: number = 8;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onFillterChange, setOnFillterChange] = useState<boolean>(false);
  const [productsFilter, setProductsFilter] =
    useState<Array<ProductType>>(products);

  useEffect(() => {
    dispatch(
      productActions.gets({ page: currentPage, perPage: numberOfProductShow })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage]);

  const countPage = useMemo(
    () => Math.ceil(totalProducts / numberOfProductShow),
    [totalProducts]
  );

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: 160,
          height: 60,
          p: 1,
        }}
        onClick={() => setIsShow(!isShow)}
      >
        <FilterAltIcon />
        <Typography fontSize={15} fontWeight={600}>
          Bộ lọc
        </Typography>
        <ArrowDropDownIcon />
      </Button>

      <BoxFilter
        isShow={isShow}
        products={products}
        setProductsFilter={setProductsFilter}
        setOnFillterChange={setOnFillterChange}
      />

      <ProductList products={onFillterChange ? productsFilter : products} />

      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          p: 5,
        }}
      >
        <Pagini countPage={countPage} setCurrentPage={setCurrentPage} />
      </Stack>
    </Box>
  );
};

export default Products;
