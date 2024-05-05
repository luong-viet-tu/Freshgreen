import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";
import { getItem, setItem } from "../../utils/handlers/tokenHandler";
import { NotificationToast } from "../../utils/handlers/NotificationToast";

interface InitialStateProps {
  products: ProductType[];
  isComparing: boolean;
}

const initialState: InitialStateProps = {
  products: getItem("productCompare") || [],
  isComparing: false,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addProductCompare: (state, action) => {
      if (
        state.products.some((product) => product._id === action.payload._id)
      ) {
        NotificationToast({ message: "Sản phẩm đã tồn tại", type: "default" });
        return;
      }
      if (state.products.length >= 6) {
        NotificationToast({ message: "Đã vượt quá số lượng", type: "error" });
        return;
      }
      state.products.push(action.payload);
      NotificationToast({
        message: `Đã thêm ${action.payload.title} vào mục so sánh`,
        type: "success",
      });
      setItem("productCompare", state.products);
    },
    removeProductCompare: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      setItem("productCompare", state.products);
    },
    checkCompare: (state, action) => {
      state.isComparing = state.products.some(
        (product) => product._id === action.payload
      );
    },
  },
});

export const { addProductCompare, removeProductCompare, checkCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
