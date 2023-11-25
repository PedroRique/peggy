import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/UserData";
import { Coordinates } from "../../models/Address";

export interface UserState {
  userData: UserData | null;
  position: Coordinates | null;
}

const initialState: UserState = {
  userData: null,
  position: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },
    setNameAndBio: (
      state,
      action: PayloadAction<{ name: string; bio: string }>
    ) => {
      state.userData = {
        ...state.userData,
        name: action.payload.name,
        bio: action.payload.bio,
      };
    },
    setUserPosition: (
      state,
      action: PayloadAction<{ position: Coordinates }>
    ) => {
      state.position = action.payload.position;
    },
  },
});
