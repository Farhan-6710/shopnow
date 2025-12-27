"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { ThemeProvider } from "./ThemeProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/authContext";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  );
}
