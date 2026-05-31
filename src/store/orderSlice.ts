import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../types/types";
import { type RootState } from "../app/store";

export const ORDER_STATUSES: OrderStatus[] = [
  "Order Placed",
  "Preparing Food",
  "Food Ready",
  "Out For Delivery",
  "Delivered",
];

interface OrderState {
  orders: Order[];
}

const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const syncOrders = (orders: Order[]) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const initialState: OrderState = { orders: loadOrders() };

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload); 
      syncOrders(state.orders);
    },
    updateOrderStatus: (state, action: PayloadAction<string>) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) {
        const currentIndex = ORDER_STATUSES.indexOf(order.status);
        if (currentIndex < ORDER_STATUSES.length - 1) {
          order.status = ORDER_STATUSES[currentIndex + 1];
          syncOrders(state.orders);
        }
      }
    },
  },
});

export const selectTotalSpent = createSelector(
  (state: RootState) => state.orders.orders,
  (orders) => orders.reduce((sum, o) => sum + o.amount, 0)
);

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;