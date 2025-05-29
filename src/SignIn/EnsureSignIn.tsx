import { useEffect } from "react";
import { useAccount } from "../store/account";
import { jwtDecode } from "jwt-decode";
import { useSignIn } from "../store/sign-in";

export function EnsureSignIn({ children }: { children?: React.ReactNode }) {
    const { token } = useAccount();
    useEffect(() => {
        if(!token) {
            useSignIn.getState().open();
            return;
        }
        const payload = jwtDecode(token);
        if(payload.exp && payload.exp * 1000 < Date.now()) {
            useAccount.getState().signOut();
            useSignIn.getState().open();
            return;
        }
    }, [token]);
    return children
}