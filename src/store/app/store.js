import { configureStore } from "@reduxjs/toolkit";
import MapSlice from "../features/map.slice";

export const store = configureStore({
  reducer: {
    map: MapSlice,
  },
});
