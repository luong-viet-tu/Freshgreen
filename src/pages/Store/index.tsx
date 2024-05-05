import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import StoreCard from "./components/StoreCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { shopActions } from "../../actions/shopActions";
import { mainColor } from "../../constants/colors";
import { ShopType } from "../../types/shopType";

const Store = () => {
  const [shopResearch, setshopResearch] = useState<ShopType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const shops = useAppSelector((state: RootState) => state.shop.shops);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(shopActions.gets());
  }, [dispatch]);

  const preShops = useMemo(() => [...shops], [shops]);

  useEffect(() => {
    setshopResearch(
      preShops.filter((shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [preShops, searchQuery]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      <Typography
        fontWeight={600}
        fontSize={60}
        align="center"
        fontFamily={"Nunito"}
      >
        Cửa hàng
      </Typography>

      <Typography align="center" color={"#555"}>
        Hiện giờ chúng tôi có <b>{shops.length}</b> cửa hàng
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          width: { sm: 500, xs: "100%" },
          display: "flex",
          flexDirection: "row",
          m: "0 auto",
          my: 5,
        }}
      >
        <TextField
          sx={{
            outline: "none",
            border: "none",
            ":hover": {
              outline: `2px solid ${mainColor}`,
            },
          }}
          onChange={handleSearch}
          placeholder="Tìm kiếm cửa hàng..."
          fullWidth
        />
        <Button
          sx={{ width: "max-content" }}
          variant="contained"
          color="success"
        >
          Search
        </Button>
      </Paper>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        py={5}
        gap={5}
      >
        {shopResearch.map((store, index) => (
          <StoreCard store={store} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Store;
