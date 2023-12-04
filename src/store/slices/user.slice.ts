import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../models/UserData";
import { Coordinates } from "../../models/Address";

export interface UserState {
  userData: UserData | null;
  position: Coordinates | null;
  profileUserData: UserData | null;
}

const initialState: UserState = {
  userData: null,
  position: null,
  profileUserData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
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
    setUserPosition: (
      state,
      action: PayloadAction<{ position: Coordinates }>
    ) => {
      state.position = action.payload.position;
    },
  },
});
