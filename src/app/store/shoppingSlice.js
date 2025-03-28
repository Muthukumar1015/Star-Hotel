import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // ✅ Ensure items is always an array
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // ✅ If item already exists, update quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // ✅ Otherwise, add new item
        state.items.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.amount;
        if (state.items[itemIndex].quantity <= 0) {
          state.items.splice(itemIndex, 1); // Remove if quantity is 0
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
