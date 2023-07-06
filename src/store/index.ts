import { configureStore } from "@reduxjs/toolkit";
import { categoriesSlice } from "./categories";
import { profileSlice } from "./profile";

const reducer = {
  categories: categoriesSlice.reducer,
  profile: profileSlice.reducer,
};

export const store = configureStore({
  reducer,
});
