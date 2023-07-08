import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../models/UserData";

export interface UserState {
  profile: UserData | null;
}

const initialState: UserState = {
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserData>) => {
      state.profile = action.payload;
    },
  },
});
