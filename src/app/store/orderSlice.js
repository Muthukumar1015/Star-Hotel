import { createSlice } from "@reduxjs/toolkit";

// ✅ Load orders from localStorage
const loadOrders = () => {
  if (typeof window !== "undefined") {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : {};
  }
  return {};
};

const initialState = {
  orders: loadOrders(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { userEmail, orderData = {} } = action.payload; // ✅ Ensure orderData is an object

      // ✅ Generate a fallback tracking ID if missing
      const newOrder = {
        id: orderData.id || `ORD-${Date.now()}`, 
        statusIndex: 0,
        startTime: orderData.startTime || Date.now(),
        ...orderData, // ✅ Spread other order details safely
      };

      const existingOrders = state.orders[userEmail] || [];

      state.orders = {
        ...state.orders,
        [userEmail]: [...existingOrders, newOrder],
      };

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    updateOrderStatus: (state, action) => {
      const { trackingId } = action.payload;
      const currentTime = Date.now();

      state.orders = Object.keys(state.orders).reduce((updatedOrders, userEmail) => {
        updatedOrders[userEmail] = state.orders[userEmail].map((order) => {
          if (order.id === trackingId) {
            const elapsedTime = (currentTime - order.startTime) / 1000;
            let newStatus = order.statusIndex;

            if (elapsedTime >= 5) newStatus = 1;
            if (elapsedTime >= 120) newStatus = 2;
            if (elapsedTime >= 300) newStatus = 3;
            if (elapsedTime >= 900) newStatus = 4;
            if (elapsedTime >= 1200) newStatus = 5;

            return { ...order, statusIndex: newStatus };
          }
          return order;
        });
        return updatedOrders;
      }, {});

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
   