import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingDetails: { firstName: "", lastName: "", email: "" },
  shippingDetails: { firstName: "", lastName: "", email: "" },
  shipToDifferent: false,
  paymentMethod: null,
  orderPlaced: false, // ✅ Tracks if an order is placed
  trackingId: null, // ✅ Stores tracking ID
  orderSummary: null, // ✅ Stores order details
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBillingDetails: (state, action) => {
      state.billingDetails = { ...state.billingDetails, ...action.payload };
    },
    setShippingDetails: (state, action) => {
      state.shippingDetails = { ...state.shippingDetails, ...action.payload };
    },
    toggleShipping: (state) => {
      state.shipToDifferent = !state.shipToDifferent;
      if (!state.shipToDifferent) {
        state.shippingDetails = { firstName: "", lastName: "", email: "" };
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    placeOrder: (state, action) => {
      state.trackingId = `TRK-${Math.floor(Math.random() * 1000000)}`; // ✅ Generate tracking ID
      state.orderSummary = action.payload; // ✅ Store order details
      state.orderPlaced = true; // ✅ Mark order as placed
    },
    resetOrder: (state) => {
      state.orderPlaced = false;
      state.trackingId = null;
      state.orderSummary = null;
    },
  },
});

export const { setBillingDetails, setShippingDetails, toggleShipping, setPaymentMethod, placeOrder, resetOrder } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
