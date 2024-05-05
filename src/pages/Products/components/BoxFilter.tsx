import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  SliderThumb,
  Typography,
  styled,
} from "@mui/material";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FilterDataSelection } from "./data/DataFilter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { mainColor } from "../../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { categoryActions } from "../../../actions/categoryActions";
import { CategoryType } from "../../../types/categoryType";
import { shopActions } from "../../../actions/shopActions";
import { ShopType } from "../../../types/shopType";
import { ProductType } from "../../../types/productType";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { productActions } from "../../../actions/productActions";

import _ from "lodash";

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <AttachMoneyIcon />
    </SliderThumb>
  );
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: mainColor,
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

interface FilterProps {
  isShow: boolean;
  products: ProductType[];
  setProductsFilter: (products: ProductType[]) => void;
  setOnFillterChange: (type: boolean) => void;
}

const BoxFilter = memo((props: FilterProps) => {
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [storeSelected, setStoreSelected] = useState<string[]>([]);
  const [tagsSelected, setTagsSelected] = useState<string>("tags/new");
  const [newPrice, setNewPrice] = useState<[number, number]>([0, 0]);

  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const shops = useAppSelector((state: RootState) => state.shop.shops);

  useEffect(() => {
    dispatch(categoryActions.gets());
    dispatch(shopActions.gets());
  }, [dispatch]);

  const handleSelect = useCallback((e: any) => {
    setTagsSelected(e.target.value);
  }, []);

  useEffect(() => {
    const max = Math.max(...props.products.map((p) => p.lastPrice));
    const min = Math.min(...props.products.map((p) => p.lastPrice));

    if (max && min) {
      setNewPrice([min, max]);
      // setCurrentPrice([min, max]);
    }
  }, [props.products]);

  const handleSelectShops = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const index = storeSelected.findIndex(
        (store) => store === e.target.value
      );
      if (index === -1) {
        setStoreSelected([...storeSelected, e.target.value]);
      } else {
        let updateStore = [...storeSelected];
        updateStore.splice(index, 1);
        setStoreSelected(updateStore);
      }
    },
    [storeSelected]
  );

  const handleSelectCategories = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const index = categorySelected.findIndex(
        (category) => category === e.target.value
      );
      if (index === -1) {
        setCategorySelected([...categorySelected, e.target.value]);
      } else {
        let updateCategories = [...categorySelected];
        updateCategories.splice(index, 1);
        setCategorySelected(updateCategories);
      }
    },
    [categorySelected]
  );

  const handleChangePrice = useCallback((e: any) => {
    setNewPrice(e.target.value);
  }, []);

  const handleFilter = () => {
    dispatch(
      productActions.gets({
        page: 1,
        perPage: 8,
        categorySelected,
        storeSelected,
        tagsSelected,
        minPrice: newPrice[0],
        maxPrice: newPrice[1],
      })
    );
    props.setOnFillterChange(true);
  };

  const handleReset = () => {
    setCategorySelected([]);
    setStoreSelected([]);
    setTagsSelected("");
    props.setOnFillterChange(false);
  };

  useEffect(() => {
    let currentProducts = props.products;
    const tagSelected = tagsSelected.split("tags/")[1];

    const FilterData = (
      value: string = "new",
      sort: "asc" | "desc" = "asc"
    ) => {
      const data = _.orderBy(currentProducts, [value], [sort]);
      props.setProductsFilter(data);
    };

    // new best low high rating

    switch (tagSelected) {
      case "new":
        FilterData("createdAt", "desc");
        break;
      case "best":
        FilterData("sold", "desc");
        break;
      case "low":
        FilterData("lastPrice", "asc");
        break;
      case "high":
        FilterData("lastPrice", "desc");
        break;
      case "rating":
        FilterData("rating.count", "desc");
        break;
      default:
        break;
    }
  }, [tagsSelected, props]);

  return (
    <Paper
      elevation={1}
      sx={{
        my: 5,
        height: props.isShow ? { sm: 500, xs: "100%" } : 0,
        transition: "height .3s ",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flexDirection: { sm: "row", xs: "column" },
          justifyContent: "space-between",
          display: "flex",
          m: 3,
        }}
      >
        <Box
          width={{ sm: "60%", xs: "100%" }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          flexWrap={{ sm: "nowrap", xs: "wrap" }}
        >
          {/* by categories */}
          <Box>
            <Typography pb={3} fontSize={23} fontWeight={600}>
              Theo thể loại
            </Typography>
            <FormGroup sx={{ height: 260, overflow: "auto", mr: 10 }}>
              {categories.map((data: CategoryType) => (
                <FormControlLabel
                  control={<Checkbox onChange={handleSelectCategories} />}
                  value={data.name}
                  label={data.name}
                  key={data._id}
                />
              ))}
            </FormGroup>
          </Box>

          {/* by shops */}
          <Box>
            <Typography pb={3} fontSize={23} fontWeight={600}>
              Theo cửa hàng
            </Typography>
            <FormGroup
              sx={{
                maxHeight: 260,
                width: 250,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              {shops.map((data: ShopType) => (
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleSelectShops} value={data._id} />
                  }
                  label={data.name}
                  key={data._id}
                />
              ))}
            </FormGroup>
          </Box>

          <FormControl sx={{ width: { sm: 200, xs: "100%" } }}>
            <InputLabel id="demo-simple-select-label">
              {FilterDataSelection.title}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tagsSelected}
              label={FilterDataSelection.title}
              onChange={handleSelect}
            >
              {FilterDataSelection.selection.map(
                (child: any, index: number) => (
                  <MenuItem value={child.active} key={index}>
                    {child.text}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
        <Box width={{ sm: "30%", xs: "100%" }}>
          <Box>
            <Typography pb={3} fontSize={23} fontWeight={600}>
              Theo Giá
            </Typography>
            <AirbnbSlider
              slots={{ thumb: AirbnbThumbComponent }}
              getAriaLabel={(index) =>
                index === 0 ? "Minimum price" : "Maximum price"
              }
              min={0}
              max={1000000}
              value={newPrice}
              onChange={handleChangePrice}
              valueLabelDisplay="on"
            />
            <Typography>
              Phạm vi:{" "}
              <b>
                {moneyFormat(newPrice[0])} - {moneyFormat(newPrice[1])}
              </b>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        p={3}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={5}
      >
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: 120,
            height: 40,
            p: 1,
          }}
          onClick={handleFilter}
        >
          <FilterAltIcon />
          <Typography fontSize={15} fontWeight={600}>
            Lọc
          </Typography>
        </Button>
        <Button color="error" sx={{ fontWeight: 600 }} onClick={handleReset}>
          Xóa tất cả
        </Button>
      </Box>
    </Paper>
  );
});

export default BoxFilter;
