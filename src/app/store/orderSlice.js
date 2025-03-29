import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const order = { ...action.payload, statusIndex: 0, startTime: Date.now() };
      state.orders.push(order);

      // ✅ Save orders to localStorage (only for logged-in user)
      if (typeof window !== "undefined") {
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },

    loadOrdersAfterLogin: (state, action) => {
      const email = action.payload; // Get user email
      if (typeof window !== "undefined") {
        const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
        // ✅ Load only orders for the logged-in user
        state.orders = allOrders.filter(order => order.userEmail === email);
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("orders"); // ✅ Remove orders on logout
      }
    },
  },
});

export const { addOrder, loadOrdersAfterLogin, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
