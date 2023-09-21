import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: []
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
        
    }
  }
});

export const {} = orderSlice.actions

export default orderSlice.reducer