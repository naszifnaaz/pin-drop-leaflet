import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  markerPosition: null,
  address: "",
  savedLocations: [],
  error: "",
};

export const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.markerPosition = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    saveLocation: (state, action) => {
      state.savedLocations.push(action.payload);
      toast.success("Location saved!");
    },
    removeLocation: (state, action) => {
      state.savedLocations.splice(action.payload, 1);
      toast.success("Location removed!");
    },
  },
});

export default MapSlice.reducer;
export const { setPosition, setAddress, saveLocation, removeLocation } =
  MapSlice.actions;
