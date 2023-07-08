import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../models/Profile";

export interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
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
