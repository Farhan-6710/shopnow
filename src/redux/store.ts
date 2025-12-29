// src/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "@/redux/cart/cartSlice";
import chatReducer from "@/redux/chat/chatSlice";
import wishlistReducer from "@/redux/wishlist/wishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "chat", "wishlist"], // persist cart, chat, and wishlist state
};

const rootReducer = combineReducers({
  cart: cartReducer,
  chat: chatReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
        ignoredPaths: ["chat.messages"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
