import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
        const {products, search} = action.payload;
        const tempProducts = products.filter((product) => {
            return (product.name.toLowerCase().includes(search.toLowerCase()) 
            || product.category.toLowerCase().includes(search.toLowerCase()));
        })
        state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const {products, sort} = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products.slice().sort((a, b) => {
          return a.createdAt.seconds - b.createdAt.seconds;
        });
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        });
      }

      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        });
      }

      state.filteredProducts = tempProducts;
    }
  }  
}); 

export const {FILTER_BY_SEARCH, SORT_PRODUCTS} = filterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer