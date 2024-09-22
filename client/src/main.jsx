import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";
import "./index.css";
import GamesReducer from "./toolkit/GamesSlicer.jsx";

const store = configureStore({
    reducer: {
        games: GamesReducer,
    },
});

// Render the React application
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
