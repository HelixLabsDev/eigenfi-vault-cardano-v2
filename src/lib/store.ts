import { create } from "zustand";

interface storeState {
  user: {
    id: number;
    address: string;
    points: number;
    utxo: { hash: string; amount: number }[];
    lastPointUpdate: number;
  };
  setUser: (domains: any) => void;
}

export const useStore = create<storeState>()((set) => ({
  user: {
    id: 0,
    address: "",
    points: 0,
    utxo: [],
    lastPointUpdate: 0,
  },
  setUser: (user) => set(() => ({ user: user })),
}));
