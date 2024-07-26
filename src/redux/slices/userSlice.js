import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  email: "",
  name: "",
  isAdmin: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state._id = action.payload._id;
      state.isAuthenticated = true;
    },
    clearUserInfo: (state) => {
      return initialState; // Reset state to initial state when clearing user info
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
