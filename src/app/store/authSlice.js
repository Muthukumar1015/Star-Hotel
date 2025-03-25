import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginPopupOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginPopup: (state) => {
      state.isLoginPopupOpen = true;
    },
    closeLoginPopup: (state) => {
      state.isLoginPopupOpen = false;
    },
  },
});

export const { openLoginPopup, closeLoginPopup } = authSlice.actions;
export default authSlice.reducer;
