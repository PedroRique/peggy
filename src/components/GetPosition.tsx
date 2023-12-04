import Geolocation from "@react-native-community/geolocation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userSlice } from "../store/slices/user.slice";

export const GetPosition = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      dispatch(
        userSlice.actions.setUserPosition({
          position: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        })
      );
    });
  }, []);

  return <></>;
};
