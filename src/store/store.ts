// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/JobSlice";
import globalReducer from "@/state"; // si ya lo usás

export const store = configureStore({
  reducer: {
    job: jobReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
