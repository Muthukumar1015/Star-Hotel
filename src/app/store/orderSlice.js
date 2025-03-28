import { createSlice } from "@reduxjs/toolkit";

const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];
const statusIntervals = [0, 5 * 1000, 15 * 60 * 1000, 30 * 60 * 1000, 40 * 60 * 1000]; // 5 sec, 15 min, 15 min, 10 min

const loadOrders = () => {
  if (typeof window !== "undefined") {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  }
  return [];
};

const initialState = {
  orders: loadOrders(),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        statusIndex: 0,
        startTime: Date.now(),
      };
      state.orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    updateOrderStatus: (state) => {
      const currentTime = Date.now();

      state.orders = state.orders.map((order) => {
        const elapsedTime = currentTime - order.startTime;
        let newStatusIndex = 0;

        for (let i = 0; i < statusIntervals.length; i++) {
          if (elapsedTime >= statusIntervals[i]) {
            newStatusIndex = i;
          }
        }

        return { ...order, statusIndex: newStatusIndex };
      });

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
