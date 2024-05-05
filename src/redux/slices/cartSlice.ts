import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getItem,
  removeItem,
  setItem,
} from "../../utils/handlers/tokenHandler";
import { cartActions } from "../../actions/cartActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import { CartType, InitialCart, ProductCartType } from "../../types/cartType";

interface InitialType {
  data: CartType;
  loading: boolean;
}
const initialState: InitialType = {
  data: getItem("cart") || InitialCart,
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.data = InitialCart;
      removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartActions.getCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          setItem("cart", action.payload);
        } else {
          setItem("cart", InitialCart);
        }
      })
      .addCase(cartActions.addProductToCart.fulfilled, (state) => {
        setItem("cart", state.data);
      })
      .addCase(cartActions.downCountProduct.fulfilled, (state) => {
        setItem("cart", state.data);
      })
      .addCase(cartActions.upCountProduct.fulfilled, (state) => {
        setItem("cart", state.data);
      })
      .addCase(cartActions.removeProduct.fulfilled, (state) => {
        setItem("cart", state.data);
      })
      // add product to cart
      .addMatcher(
        isAnyOf(
          cartActions.addProductToCart.pending,
          cartActions.addProductToCart.rejected
        ),
        (state, action) => {
          const productsInCart: ProductCartType[] = state.data?.products || [];
          const updatedProducts = [...productsInCart];
          const productIndex = productsInCart.findIndex(
            (product) => product._id === action.meta.arg.product._id
          );

          if (action.type === cartActions.addProductToCart.pending.type) {
            // Handle pending action
            if (productIndex !== -1) {
              updatedProducts[productIndex] = {
                ...updatedProducts[productIndex],
                count: updatedProducts[productIndex].count + 1,
              };
            } else {
              updatedProducts.push(action.meta.arg.product);
            }
          } else {
            // Handle rejected action
            if (productIndex !== -1) {
              updatedProducts.splice(productIndex, 1);
            }
          }

          return {
            ...state,
            data: {
              ...state.data,
              products: updatedProducts,
            },
          };
        }
      )

      // cart up
      .addMatcher(
        isAnyOf(
          cartActions.upCountProduct.pending,
          cartActions.upCountProduct.rejected
        ),
        (state, action) => {
          const updatedProducts = state.data.products.map((product) => {
            if (product._id === action.meta.arg.productId) {
              return {
                ...product,
                count:
                  product.count +
                  (action.type === cartActions.upCountProduct.pending.type
                    ? 1
                    : -1),
              };
            }
            return product;
          });

          const updatedCart = {
            ...state.data,
            products: updatedProducts,
          };
          return {
            ...state,
            data: updatedCart,
          };
        }
      )
      // cart down
      .addMatcher(
        isAnyOf(
          cartActions.downCountProduct.pending,
          cartActions.downCountProduct.rejected
        ),
        (state, action) => {
          const indexProduct = state.data.products.findIndex(
            (product) => product._id === action.meta.arg.productId
          );
          let currentProduct = { ...state.data.products[indexProduct] };
          currentProduct = {
            ...currentProduct,
            count:
              currentProduct.count -
              (action.type === cartActions.downCountProduct.pending.type
                ? 1
                : -1),
          };
          if (currentProduct.count > 0) {
            state.data.products[indexProduct] = currentProduct;
          } else {
            state.data.products.splice(indexProduct, 1);
          }
        }
      )
      // remove cart
      .addMatcher(
        isAnyOf(
          cartActions.removeProduct.pending,
          cartActions.removeProduct.rejected
        ),
        (state, action) => {
          const productIdToRemove = action.meta.arg.productId;
          if (action.type === cartActions.removeProduct.pending.type) {
            state.data.products = state.data.products.filter(
              (product) => product._id !== productIdToRemove
            );
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
          state.loading = true;
        }
      );
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
