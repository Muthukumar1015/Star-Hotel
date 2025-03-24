import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "Fast Food",
  categories: [
    { name: "Fast Food", icon: "🍔" },
    { name: "Drink & Juice", icon: "🍹" },
    { name: "Chicken Pizza", icon: "🍕" },
    { name: "Fresh Pasta", icon: "🍝" },
  ],
  menuItems: [
    { name: "Chinese Pasta", price: "$15.99", img: "/images/menuThumb1_1.png", category: "Fast Food" },
{ name: "Chicken Fried Rice", price: "$25.99", img: "/images/menuThumb1_2.png", category: "Fast Food" },
{ name: "Chicken Pizza", price: "$115.99", img: "/images/menuThumb1_3.png", category: "Chicken Pizza" },
{ name: "Chicken Noodles", price: "$154.99", img: "/images/menuThumb1_4.png", category: "Fast Food" },
{ name: "Grilled Chicken", price: "$55.99", img: "/images/menuThumb1_5.png", category: "Fast Food" },
{ name: "Egg And Cucumber", price: "$65.99", img: "/images/menuThumb1_6.png", category: "Fresh Pasta" },
{ name: "Chicken White Rice", price: "$135.99", img: "/images/menuThumb1_7.png", category: "Fresh Pasta" },
{ name: "Spatial Barger", price: "$95.99", img: "/images/menuThumb1_8.png", category: "Fast Food" },
{ name: "Vegetables Burger", price: "$75.99", img: "/images/menuThumb1_9.png", category: "Fast Food" },
{ name: "Brief Chicken", price: "$44.99", img: "/images/menuThumb1_10.png", category: "Fast Food" },
  ],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      if (state.activeCategory === action.payload) {
        state.activeCategory = "All"; // If clicking the same category, show all items
      } else {
        state.activeCategory = action.payload;
      }
    },
  },
});


export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
