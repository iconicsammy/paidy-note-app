import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";

const Store = configureStore({
    reducer: {
        notes: noteReducer
    },
    devTools: true
});


export default Store;