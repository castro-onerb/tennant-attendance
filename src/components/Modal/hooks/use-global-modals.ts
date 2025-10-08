import { useContext } from "react";
import { GlobalModalContext } from "../provider/modal-provider";

export function useGlobalModal() {
  const ctx = useContext(GlobalModalContext);
  if (!ctx) throw new Error('useGlobalModal must be used within GlobalModalProvider');
  return ctx;
}

export function uid() {
    return Math.random().toString(36).slice(2, 9);
}
