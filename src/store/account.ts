import { create } from "zustand";

export type Account = {
    username: string;
    token: string;
    signIn: (username: string, token: string) => Promise<void>;
    signOut: () => void;
};

export const useAccount = create<Account>((set) => ({
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    signIn: async (username: string, token: string) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        set({ username, token });
    },
    signOut: () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        set({ username: "", token: "" });
    }
}));
