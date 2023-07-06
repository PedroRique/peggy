import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../models/Profile";

const initialState: {
  profile: Profile | null;
} = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});
