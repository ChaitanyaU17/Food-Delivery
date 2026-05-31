import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  restaurantIds: string[];
}

const loadFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FavoriteState = { restaurantIds: loadFavorites() };

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.restaurantIds.indexOf(id);
      if (index >= 0) {
        state.restaurantIds.splice(index, 1);
      } else {
        state.restaurantIds.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.restaurantIds));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;