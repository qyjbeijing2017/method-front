import type { HttpService } from './http-request'

export const signInService: HttpService<{
    username: string;
    password: string;
}, {
    access_token: string;
}> = async (req) => ({
    url: import.meta.env.VITE_ENTRY_POINT + '/auth/login',
    public: true,
    method: 'POST',
    body: {
        username: req.username,
        password: req.password,
    },
})