import { configureStore } from "@reduxjs/toolkit";
import { CategoryState, categorySlice } from "./slices/category.slice";
import { ProductState, productSlice } from "./slices/product.slice";
import { UserState, userSlice } from "./slices/user.slice";

export interface AppState {
  category: CategoryState;
  user: UserState;
  product: ProductState;
}

const reducer = {
  category: categorySlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
};

export const store = configureStore({
  reducer,
});
