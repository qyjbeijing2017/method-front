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
    }, [token]);
    return children
}