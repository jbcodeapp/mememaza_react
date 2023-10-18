"use client";
import JeenaHead from "@/src/layout/JeenaHead";
import "@/styles/globals.css";
import { startAppListening, store, useAppDispatch } from "@/src/store";
import { Provider } from "react-redux";
import { useEffect } from "react";

import { setupCounterListeners } from "@/src/services/counter/listeners";
import { authActions, getAuthCheck } from "@/src/services/auth/slice";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const subscriptions = [setupCounterListeners(startAppListening)];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Provider store={store}>
      <JeenaHead />
      <Component {...pageProps} />
    </Provider>
  );
}
