import { useAccount } from "../store/account";
import { useSignIn } from "../store/sign-in";

export interface IReq<Res> {
    url: string;
    host?: string; // Optional host to override the base URL
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
    query?: Record<string, string | number | boolean>;
    responseType?: 'json' | 'blob';
    public?: boolean;
    onResponse?: (response: Response) => Promise<Res> | Res;
}

export type HttpService<Req, Res> = (req: Req) => Promise<IReq<Res>> | IReq<Res>;

export async function httpRequest<Res>(req: IReq<Res> | Promise<IReq<Res>>): Promise<Res> {
    if (req instanceof Promise) {
        req = await req;
    }
    const url = req.url;
    const method = req.method || 'GET';
    const token = req.public ? false : useAccount.getState().token;
    const host = req.host || import.meta.env.VITE_ENTRY_POINT;

    if (!req.public && !token) {
        useSignIn.getState().open();
        throw new Error('error_401');
    }

    const headers: Record<string, string> = {
        'Content-Type': req.body instanceof FormData ? 'multipart/form-data' : 'application/json',
        'Authorization': token ? `Bearer ${useAccount.getState().token}` : '',
        ...req.headers,
    };
    const queryParams = req.query ?
        new URLSearchParams(Object.keys(req.query).reduce((acc, key) => {
            acc[key] = String(req.query![key]);
            return acc;
        }, {} as Record<string, string>)) : null;
    const fullUrl = queryParams ? `${host}${url}?${queryParams.toString()}` : url;


    const resp = await fetch(fullUrl, {
        method,
        headers,
        body: req.body ? (req.body instanceof FormData ? req.body : JSON.stringify(req.body)) : undefined,
    })

    if (req.onResponse) {
        return await req.onResponse(resp);
    }



    if (resp.status === 401 && !req.public) {
        useAccount.getState().signOut();
        useSignIn.getState().open();
        throw new Error('error_401');
    }

    if (!resp.ok) {
        let jsonError: {
            error?: string;
            message?: string;
            statusCode?: number;
        };
        try {
            jsonError = await resp.json();
        } catch (e) {
            console.error('Failed to parse error response:', e);
            throw new Error(`error_${resp.status}`);
        }
        if (jsonError.message) {
            throw new Error(jsonError.message);
        }
        throw new Error(`error_${resp.status}`);
    }

    if (req.responseType === 'blob') {
        return (await resp.blob()) as unknown as Res;
    }
    return resp.json() as Promise<Res>;
}