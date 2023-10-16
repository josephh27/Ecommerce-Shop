import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    origFilteredProducts: [],
    filteredProducts: [],
    searchFilteredProducts: [],
    adminViewedProducts: [],
    currentFilters: {}
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
        const {search} = action.payload;
        const currentProducts = state.origFilteredProducts
        const tempProducts = currentProducts.filter((product) => {
            return (product.name.toLowerCase().includes(search.toLowerCase()) 
            || product.category.toLowerCase().includes(search.toLowerCase()));
        })
        state.searchFilteredProducts = tempProducts;
        state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const {sort} = action.payload;
      const products = state.filteredProducts;
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
    },
    FILTER_ITEMS(state, action) {
      const {products, category, brand, price} = action.payload;
      
      let tempProducts = [];
            
      tempProducts = products.filter((product) => {
        return category === "All" || product.category === category 
      })  
      
      tempProducts = tempProducts.filter((product) => {
        return brand === "All" || product.brand === brand
      })
    
      tempProducts = tempProducts.filter((product) => {
        return parseInt(product.price) <= parseInt(price)
      });

      state.origFilteredProducts = tempProducts;
      state.filteredProducts = tempProducts;
      state.currentFilters = {
        category,
        brand,
        price,
      };
    },
    ADMIN_FILTER_ITEMS(state, action) {
      const {search, products} = action.payload;
      const tempProducts = products.filter((product) => {
          return (product.name.toLowerCase().includes(search.toLowerCase()) 
          || product.category.toLowerCase().includes(search.toLowerCase()));
      })
      state.adminViewedProducts = tempProducts;
    }
  }  
}); 

export const {FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE, FILTER_ITEMS, ADMIN_FILTER_ITEMS} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export const selectOrigFilteredProducts = (state) => state.filter.origFilteredProducts;

export const selectAdminViewedProducts = (state) => state.filter.adminViewedProducts;

export const selectCurrentFilters = (state) => state.filter.currentFilters;

export default filterSlice.reducer