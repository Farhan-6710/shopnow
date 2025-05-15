// src/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/src/redux/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
