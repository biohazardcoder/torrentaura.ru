import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Toolkit/UserSlicer.jsx";
import { Provider } from "react-redux";
import AdminsReducer from "./Toolkit/AdminsSlicer.jsx";
import OrdersReducer from "./Toolkit/OrdersSlicer.jsx";
import ProductsReducer from "./Toolkit/ProductsSlicer.jsx";
import ClientsReducer from "./Toolkit/ClientsSlicer.jsx";

const store = configureStore({
  reducer: {
    user: UserReducer,
    admins: AdminsReducer,
    orders: OrdersReducer,
    products: ProductsReducer,
    clients: ClientsReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
