import {createSlice, createSelector} from '@reduxjs/toolkit';
import { restaurants } from './../data/restaurants';
import type { FilterState, Restaurant } from './../types/types';
import { type RootState } from '../app/store';

interface RestaurantState {
    items: Restaurant[];
    filters: FilterState;
    loading: boolean;
}

const initialState: RestaurantState = {
    items: restaurants,
    filters: {search: "", rating: null, sortBy: null},
    loading: false,
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.filters.search = action.payload;
        },
        setRatingFilter: (state, action) => {
            state.filters.rating = action.payload;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {search: '', rating: null, sortBy: null};
        },
    },
});

export const selectFilteredRestaurants = createSelector(
  (state: RootState) => state.restaurants.items,
  (state: RootState) => state.restaurants.filters,
  (items, filters): Restaurant[] => {
    let result = [...items];

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisines.some((c) => c.toLowerCase().includes(query))
      );
    }

    if (filters.rating !== null) {
      result = result.filter((r) => r.rating >= filters.rating!);
    }

    if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "deliveryTime") {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (filters.sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }
);

export const { setSearch, setRatingFilter, setSortBy, clearFilters } = restaurantSlice.actions;
export default restaurantSlice.reducer;
