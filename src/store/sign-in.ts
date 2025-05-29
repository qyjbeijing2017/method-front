import { create } from "zustand";

export interface SignInProps {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export const useSignIn = create<SignInProps>((set) => ({
    opened: false,
    open: () => set({ opened: true }),
    close: () => set({ opened: false }),
}));