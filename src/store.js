import { useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  createListenerMiddleware,
  addListener,
} from "@reduxjs/toolkit";
import { counterSlice } from "./services/counter/slice";
import { authSlice } from "./services/auth/slice";

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
});

export { store };

export const startAppListening = listenerMiddlewareInstance.startListening;
export const addAppListener = addListener;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
