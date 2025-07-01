"use client";

import { useRef } from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import globalReducer from "@/state";
import jobReducer from "@/store/slices/JobSlice"; // Asegurate de tener este slice creado
import modalReducer from "@/store/slices/ModalSlice";
import candidateDetailReducer from "@/store/slices/CandidateDetailSlice";

// ⛔ Safe storage fallback para SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// 🎯 Redux Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global", "job", "modal",  "candidateDetail"],
};

// 🎯 Combine reducers
const rootReducer = combineReducers({
  global: globalReducer,
  job: jobReducer,
  modal: modalReducer,
  candidateDetail: candidateDetailReducer,
});

// 🎯 Apply persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🎯 Factory de store
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// Tipado Redux
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 🎯 Provider funcional para Next.js App Router
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
