"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { loadState } from "@/utils/localStorage";
import { replace } from "@/src/redux/cart/cartSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const cartState = loadState();
    if (cartState) {
      store.dispatch(replace(cartState)); // safely hydrate state
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
