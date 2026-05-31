import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, MenuItem } from "../types/types";
import { type RootState } from "../app/store";

interface CartState {
    items: CartItem[];
}

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const syncCart = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = { items: loadCart() };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<MenuItem>) => {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
            syncCart(state.items);
        },
            removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      syncCart(state.items);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      syncCart(state.items);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      syncCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      syncCart([]);
    },
    }
});

export const selectCartItemCount = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;