import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";

export interface ProductState {
  nearProducts: Product[];
  profileProducts: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  nearProducts: [],
  profileProducts: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setNearProducts: (state, action) => {
      state.nearProducts = action.payload;
    },
    setProfileProducts: (state, action) => {
      state.profileProducts = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});
