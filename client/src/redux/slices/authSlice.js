import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedIn: false,
    user: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});
export const { setLoggedIn, setUserDetails, updateUserDetails } =
  authSlice.actions;
export default authSlice.reducer;
