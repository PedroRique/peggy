import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

export interface ProductsState {
  nearProducts: Product[];
  profileProducts: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  nearProducts: [],
  profileProducts: [],
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setNearProducts: (state, action) => {
      state.nearProducts = action.payload;
    },
    setProfileProducts: (state, action) => {
      state.profileProducts = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
});
