import { configureStore } from "@reduxjs/toolkit";
import { categoriesSlice } from "./categories";
import { userSlice } from "./user";

const reducer = {
  categories: categoriesSlice.reducer,
  user: userSlice.reducer,
};

export const store = configureStore({
  reducer,
});
