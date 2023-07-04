import { configureStore } from "@reduxjs/toolkit";
import { categoriesSlice } from "./categories";

export const store = configureStore({
  reducer: categoriesSlice.reducer,
});
