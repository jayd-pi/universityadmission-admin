import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, productSlice);

const store = configureStore({
  reducer: { productSlice: persistedReducer, cart: cartSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

