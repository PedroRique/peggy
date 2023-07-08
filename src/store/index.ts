import { configureStore } from "@reduxjs/toolkit";
import { CategoriesState, categoriesSlice } from "./categories";
import { ProductsState, productsSlice } from "./products";
import { ProfileState, profileSlice } from "./profile";

export interface AppState {
  categories: CategoriesState;
  profile: ProfileState;
  products: ProductsState;
}

const reducer = {
  categories: categoriesSlice.reducer,
  profile: profileSlice.reducer,
  products: productsSlice.reducer,
};

export const store = configureStore({
  reducer,
});
