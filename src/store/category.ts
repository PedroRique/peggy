import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/Category";

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
  },
});
