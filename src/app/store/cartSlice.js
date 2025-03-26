import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalItems += 1;
    },

    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity + amount > 0) {
          existingItem.quantity += amount;
          state.totalItems += amount;
        } else {
          state.totalItems -= existingItem.quantity; // Remove full quantity from count
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

    removeFromCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (existingItem) {
        state.totalItems -= existingItem.quantity; // Subtract full quantity from total
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    clearCart: (state) => {
      state.totalItems = 0;
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
