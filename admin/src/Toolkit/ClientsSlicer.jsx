import { createSlice } from "@reduxjs/toolkit";

const ClientsSlicer = createSlice({
  name: "Clients",
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: "",
  },
  reducers: {
    getClientPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getClientSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getClientError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getClientError, getClientPending, getClientSuccess } =
  ClientsSlicer.actions;
export default ClientsSlicer.reducer;
