import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/UserData";

export interface UserState {
  UserData: UserData | null;
  profileUserData: UserData | null;
}

const initialState: UserState = {
  UserData: null,
  profileUserData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.UserData = action.payload;
    },
    setProfileUserData: (state, action: PayloadAction<UserData | null>) => {
      state.profileUserData = action.payload;
    },
    setNameAndBio: (state, action: PayloadAction<{ name: string; bio: string }>) => {
      if (state.profileUserData) {
        state.profileUserData = {
          ...state.profileUserData,
          name: action.payload.name,
          bio: action.payload.bio,
        };
      }
    },
  },
});
