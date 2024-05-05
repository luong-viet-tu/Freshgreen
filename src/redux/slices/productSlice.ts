import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";
import { productActions } from "../../actions/productActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  products: Array<ProductType>;
  product: ProductType | null;
  popular: Array<ProductType>;
  newProducts: Array<ProductType>;
  ratedHighest: Array<ProductType>;
  biggestDiscount: Array<ProductType>;
  bestSeller: Array<ProductType>;
  productsView: Array<ProductType>;
  similarProducts: Array<ProductType>;
  productReSearch: Array<ProductType>;
  shopProducts: {
    products: ProductType[];
    totalProducts: number;
  };
  totalProducts: number;
  loading: boolean;
  productLoading: boolean;
  searchLoading: boolean;
  modal: {
    data?: ProductType;
    open: boolean;
  };
}

const initialState: InitialStateProps = {
  products: [],
  product: null,
  popular: [],
  bestSeller: [],
  newProducts: [],
  ratedHighest: [],
  similarProducts: [],
  biggestDiscount: [],
  productsView: [],
  productReSearch: [],
  shopProducts: { products: [], totalProducts: 0 },
  totalProducts: 0,
  loading: false,
  productLoading: true,
  searchLoading: false,
  modal: {
    data: undefined,
    open: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductModal: (state, action) => {
      state.modal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productActions.gets.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload?.products;
          state.totalProducts = action.payload?.totalProducts;
        }
      })
      .addCase(productActions.get.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productLoading = false;
      })
      .addCase(productActions.popular.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(productActions.bestSeller.fulfilled, (state, action) => {
        state.bestSeller = action.payload;
      })
      .addCase(productActions.similarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(
        productActions.getBiggestDiscountProducts.fulfilled,
        (state, action) => {
          state.biggestDiscount = action.payload;
        }
      )
      .addCase(productActions.newProducts.fulfilled, (state, action) => {
        state.newProducts = action.payload;
      })
      .addCase(
        productActions.ratedHighestProducts.fulfilled,
        (state, action) => {
          state.ratedHighest = action.payload;
        }
      )
      .addCase(productActions.create.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(productActions.update.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== 1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(productActions.delete.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.meta.arg._id
        );
        state.products.splice(index, 1);
      })
      .addCase(productActions.getShopProducts.fulfilled, (state, action) => {
        state.shopProducts = action.payload;
      })
      .addCase(productActions.getProductsView.fulfilled, (state, action) => {
        state.productsView = action.payload;
      })
      // .addCase(productActions.updateView.fulfilled, (state, action) => {
      //   if (!action.payload) return;
      //   const indexProduct = state.products.findIndex(
      //     (product) => product._id === action.meta.arg
      //   );
      //   const currentProduct = state.products[indexProduct];
      //   state.products[indexProduct] = {
      //     ...currentProduct,
      //     views: currentProduct.views + 1,
      //   };
      // })
      .addCase(productActions.searchProducts.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(productActions.searchProducts.fulfilled, (state, action) => {
        state.productReSearch = action.payload;
        state.searchLoading = false;
      })
      .addCase(productActions.searchProducts.rejected, (state) => {
        state.searchLoading = false;
      })
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

export const { setProductModal } = productSlice.actions;
export default productSlice.reducer;
