import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../models/Profile";

export interface UserState {
  profile: Profile | null;
}

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});
