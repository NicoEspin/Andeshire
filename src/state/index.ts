import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  locale: "en" | "es";
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  locale: "en", // idioma por defecto
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setLocale: (state, action: PayloadAction<"en" | "es">) => {
      state.locale = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setLocale } = globalSlice.actions;

export default globalSlice.reducer;
