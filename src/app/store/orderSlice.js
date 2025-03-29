import { createSlice } from "@reduxjs/toolkit";

const loadLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
};

const initialState = {
  orders: loadLocalStorage("orders", []),
  trackingStatus: loadLocalStorage("trackingStatus", {}),
};

const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];
const timeIntervals = [1, 3, 5, 8]; // Time in minutes for each status update

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const order = { 
        ...action.payload, 
        statusIndex: 0, 
        startTime: Date.now() 
      };

      state.orders.push(order);
      state.trackingStatus[order.id] = { index: 0, startTime: order.startTime };

      localStorage.setItem("orders", JSON.stringify(state.orders));
      localStorage.setItem("trackingStatus", JSON.stringify(state.trackingStatus));
    },

    loadOrdersAfterLogin: (state, action) => {
      const email = action.payload;
      const allOrders = loadLocalStorage("orders", []);
      state.orders = allOrders.filter(order => order.userEmail === email);
    },

    updateOrderStatus: (state) => {
      const now = Date.now();
      let hasUpdate = false;
      const updatedTrackingStatus = { ...state.trackingStatus };

      console.log("Updating Order Status...");

      state.orders.forEach((order) => {
        if (order.statusIndex >= statuses.length - 1) return; // Already delivered

        const elapsedTime = (now - order.startTime) / (1000 * 60); // Convert to minutes
        let newIndex = order.statusIndex;

        for (let i = 0; i < timeIntervals.length; i++) {
          if (elapsedTime >= timeIntervals[i]) {
            newIndex = i + 1;
          }
        }

        if (newIndex > order.statusIndex) {
          console.log(`Order ${order.id} status updated: ${statuses[newIndex]}`);
          order.statusIndex = newIndex;
          updatedTrackingStatus[order.id] = { index: newIndex, startTime: order.startTime };
          hasUpdate = true;
        }
      });

      if (hasUpdate) {
        state.trackingStatus = updatedTrackingStatus;
        localStorage.setItem("orders", JSON.stringify(state.orders));
        localStorage.setItem("trackingStatus", JSON.stringify(updatedTrackingStatus));
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      state.trackingStatus = {};
      localStorage.removeItem("orders");
      localStorage.removeItem("trackingStatus");
    },
  },
});

export const { addOrder, loadOrdersAfterLogin, updateOrderStatus, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
