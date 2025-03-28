import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Chicken Pizza", price: 24, category: "Chicken", image: "/images/dishes3.png", rating: 4.5 },
    { id: 2, name: "Egg And Cucumber", price: 28, category: "Drink", image: "/images/item4.png", rating: 4.2 },
    { id: 3, name: "Chicken Fried Rice", price: 100.99, category: "Chicken", image: "/images/dishes1.png", rating: 4.0 },
    { id: 4, name: "Chicken Leg Piece", price: 50, category: "Chicken", image: "/images/offerThumb1.png", rating: 5.0 },
    { id: 5, name: "Fast Food Combo", price: 17, category: "Cocktail", image: "/images/dishes5.png", rating: 4.3 },
    { id: 6, name: "Chinese Pasta", price: 15.99, category: "Pasta", image: "/images/dishes2.png", rating: 4.1 },
    { id: 7, name: "Chicken Noodles", price: 39, category: "Noodles", image: "/images/dishes4.png", rating: 4.2 },
    { id: 8, name: "Grilled Chicken", price: 20.99, category: "Chicken", image: "/images/dishes5.png", rating: 4.8 },
    { id: 9, name: "Spicy Fried Chicken", price: 50.99, category: "Chicken", image: "/images/offerThumb1.png", rating: 4.6 },
    { id: 10, name: "Special Chicken Roll", price: 30.99, category: "Chicken", image: "/images/offerThumb3.png", rating: 4.7 },
    { id: 11, name: "Cheesy Pizza", price: 18.99, category: "Pizza", image: "/images/item3.png", rating: 4.4 },
    { id: 12, name: "Tasty Pasta", price: 22.99, category: "Pasta", image: "/images/item4.png", rating: 4.3 },
    { id: 1, name: "Chicken Pizza", price: 24, category: "Chicken", image: "/images/dishes3.png", rating: 4.5 },
    { id: 2, name: "Egg And Cucumber", price: 28, category: "Drink", image: "/images/item4.png", rating: 4.2 },
    { id: 3, name: "Chicken Fried Rice", price: 100.99, category: "Chicken", image: "/images/dishes1.png", rating: 4.0 },
    { id: 4, name: "Chicken Leg Piece", price: 50, category: "Chicken", image: "/images/offerThumb1.png", rating: 5.0 },
    { id: 5, name: "Fast Food Combo", price: 17, category: "Cocktail", image: "/images/offerThumb1.png", rating: 4.3 },
    { id: 6, name: "Chinese Pasta", price: 15.99, category: "Pasta", image: "/images/dishes2.png", rating: 4.1 },
    { id: 7, name: "Chicken Noodles", price: 39, category: "Noodles", image: "/images/dishes4.png", rating: 4.2 },
    { id: 8, name: "Grilled Chicken", price: 20.99, category: "Chicken", image: "/images/dishes5.png", rating: 4.8 },
    { id: 9, name: "Spicy Fried Chicken", price: 50.99, category: "Chicken", image: "/images/offerThumb1.png", rating: 4.6 },
    { id: 10, name: "Special Chicken Roll", price: 30.99, category: "Chicken", image: "/images/offerThumb3.png", rating: 4.7 },
    { id: 11, name: "Cheesy Pizza", price: 18.99, category: "Pizza", image: "/images/item3.png", rating: 4.4 },
    { id: 12, name: "Tasty Pasta", price: 22.99, category: "Pasta", image: "/images/item4.png", rating: 4.3 },
  ],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const { searchQuery, selectedCategory, priceRange } = action.payload;
      let filtered = state.products;

      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category === selectedCategory);
      }

      state.filteredProducts = filtered;
    },
  },
});

export const { filterProducts } = productsSlice.actions;
export default productsSlice.reducer;