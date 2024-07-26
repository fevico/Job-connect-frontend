import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems"))
    : [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const { _id } = action.payload;
      if (!state.favoriteItems.some((item) => item._id === _id)) {
        state.favoriteItems.push(action.payload);
        localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
      }
    },
    removeFromFavorites(state, action) {
      const nextFavoriteItems = state.favoriteItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.favoriteItems = nextFavoriteItems;
      localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
