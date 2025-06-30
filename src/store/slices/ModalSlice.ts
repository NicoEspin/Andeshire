import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "NONE" | "DETAILS" | "CONFIRMATION" | "FORM";

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  props: Record<string, any> | null; // Datos adicionales para el modal
}

const initialState: ModalState = {
  isOpen: false,
  type: "NONE",
  props: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; props?: Record<string, any> }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.props = action.payload.props || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "NONE";
      state.props = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
