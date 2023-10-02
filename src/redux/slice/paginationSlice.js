import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        SET_CURRENT_PAGE(state, action) {
            const page = action.payload;
            state.currentPage = page;
        },
        RESET_CURRENT_PAGE(state) {
            state.currentPage = 1;
        }
    }
})

export const {SET_CURRENT_PAGE, RESET_CURRENT_PAGE} = paginationSlice.actions;

export const selectCurrentPage = (state) => state.pagination.currentPage;

export default paginationSlice.reducer;

