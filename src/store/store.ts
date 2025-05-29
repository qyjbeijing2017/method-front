import { create } from 'zustand';

export type MethodState = {
  count: number;
  increase: () => void;
};

export const useMethodState = create<MethodState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));
