"use client";

import { useAppSelector, useAppDispatch } from "@/app/redux";
import { closeModal } from "@/store/slices/ModalSlice";
import CandidateDetail from "./CandidateDetail/CandidateDetail";

export default function ModalManager() {
  const { isOpen, type, props } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  switch (type) {
    case "DETAILS":
      return props?.candidateId ? (
        <CandidateDetail
          key={props.candidateId}  // 🔑 Clave para forzar desmontaje
          candidateId={props.candidateId}
          onClose={handleClose}
        />
      ) : null;

    default:
      return null;
  }
}
