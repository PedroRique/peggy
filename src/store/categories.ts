import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/Category";

export interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});
