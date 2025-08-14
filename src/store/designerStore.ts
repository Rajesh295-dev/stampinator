import { create } from "zustand";

interface DesignerState {
  shirtColor: string;
  setShirtColor: (color: string) => void;
}

export const useDesignerStore = create<DesignerState>((set) => ({
  shirtColor: "#ffffff",
  setShirtColor: (color) => set({ shirtColor: color }),
}));
