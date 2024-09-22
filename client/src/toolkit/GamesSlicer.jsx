import { createSlice } from "@reduxjs/toolkit";

const GamesSlicer = createSlice({
    name: "Games",
    initialState: {
        data: [],
        isAuth: false,
        isPending: false,
        isError: "",
    },
    reducers: {
        getProductPending(state) {
            state.isPending = true;
            state.isError = "";
        },
        getProductSuccess(state, { payload }) {
            state.isAuth = true;
            state.data = payload;
            state.isPending = false;
        },
        getProductError(state, { payload }) {
            state.isPending = false;
            state.isError = payload;
        },
    },
});

export const { getProductError, getProductPending, getProductSuccess } =
    GamesSlicer.actions;
export default GamesSlicer.reducer;
