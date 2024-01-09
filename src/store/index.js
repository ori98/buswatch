import { configureStore } from "@reduxjs/toolkit";

import busReducer from "../components/TextBlock/busReducer";

const store = configureStore({
    reducer: {
        busReducer,
    }
});

export default store;