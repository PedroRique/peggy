import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

const initialState: {
  user: User | null;
} = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});
