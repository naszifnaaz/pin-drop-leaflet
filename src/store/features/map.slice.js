import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export default MapSlice.reducer;
export const { setPosition, setAddress, saveLocation } = MapSlice.actions;
