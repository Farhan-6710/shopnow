// src/redux/store.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import {
  cartReducer,
  chatReducer,
  wishlistReducer,
  feedbackReducer,
} from "./slices";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "chat", "wishlist"], // persist cart, chat, and wishlist state (not products)
};

const rootReducer = combineReducers({
  cart: cartReducer,
  chat: chatReducer,
  wishlist: wishlistReducer,
  feedback: feedbackReducer,
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
      thunk: false, // Disable thunk since we're using saga
    }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
