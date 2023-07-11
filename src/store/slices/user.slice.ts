import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/UserData";

export interface UserState {
  userData: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },
  },
});
