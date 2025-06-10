import { useEffect } from "react";
import { useAccount } from "../store/account";
import { jwtDecode } from "jwt-decode";
import { useSignIn } from "../store/sign-in";
import { useNavigate, useParams } from "react-router";

export function EnsureSignIn({ children }: { children?: React.ReactNode }) {
    const { token } = useAccount();
    const navigate = useNavigate();
    const { language } = useParams<{ language?: string }>();
    useEffect(() => {
        if (!token) {
            useSignIn.getState().open();
            navigate(`/${language || 'en_US'}`);
            return;
        }
        const payload = jwtDecode(token);
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            useAccount.getState().signOut();
            useSignIn.getState().open();
            navigate(`/${language || 'en_US'}`);
            return;
        }
    }, [language, navigate, token]);
    return token ? children : <></>
}