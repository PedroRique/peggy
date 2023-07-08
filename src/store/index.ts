import { configureStore } from "@reduxjs/toolkit";
import { CategoryState, categorySlice } from "./category";
import { ProductState, productSlice } from "./product";
import { ProfileState, profileSlice } from "./profile";

export interface AppState {
  category: CategoryState;
  profile: ProfileState;
  product: ProductState;
}

const reducer = {
  category: categorySlice.reducer,
  profile: profileSlice.reducer,
  product: productSlice.reducer,
};

export const store = configureStore({
  reducer,
});
