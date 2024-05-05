import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { favoriteActions } from "../../actions/favoriteActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import {
  getItem,
  removeItem,
  setItem,
} from "../../utils/handlers/tokenHandler";
import { ProductType } from "../../types/productType";

interface InitialStateProps {
  favoriteProducts: ProductType[];
  loading: boolean;
  isFavorite: boolean;
}

const initialState: InitialStateProps = {
  favoriteProducts: getItem("favorite") || [],
  loading: false,
  isFavorite: false,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    clearFavorite: (state) => {
      state.favoriteProducts = [];
      removeItem("favorite");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(favoriteActions.get.fulfilled, (state, action) => {
        if (action.payload) {
          const products = action.payload.products;
          const updateFvorite = products.map(
            ({ product }: { product: ProductType }) => product
          );
          state.favoriteProducts = [...updateFvorite];
          setItem("favorite", [...updateFvorite]);
        }
      })
      .addCase(favoriteActions.update.fulfilled, (state, action) => {
        setItem("favorite", state.favoriteProducts);
      })
      .addMatcher(
        isAnyOf(
          favoriteActions.update.rejected,
          favoriteActions.update.pending
        ),
        (state, action) => {
          const productCurrent = action.meta.arg.product;
          const id = productCurrent._id;
          const index = state.favoriteProducts.findIndex(
            (product) => product._id === id
          );
          const checkPendingType =
            action.type === favoriteActions.update.pending.type;

          if (index !== -1) {
            if (checkPendingType) {
              state.favoriteProducts = state.favoriteProducts.filter(
                (product) => product._id !== id
              );
            } else {
              state.favoriteProducts.push(productCurrent);
            }
          } else {
            if (checkPendingType) {
              state.favoriteProducts.push(productCurrent);
            } else {
              state.favoriteProducts = state.favoriteProducts.filter(
                (product) => product._id !== id
              );
            }
          }
        }
      )

      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
