import { useEffect, useState } from "react";
import type { Action } from "./action";

export function useAction<T>(action: Action<T>) {
    const [param, setParam] = useState<T | null>(null);
    useEffect(() => {
        const listener = (data: T) => {
            setParam(data);
        };
        action.addListener(listener);
        return () => {
            action.removeListener(listener);
        };
    }, [action]);
    return param;
}
