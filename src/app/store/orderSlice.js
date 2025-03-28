import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push({ ...action.payload, status: "Order Confirmed" });
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
    }
  }
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
