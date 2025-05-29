import type { HttpService } from './http-request'

export const signUpService: HttpService<{
    username: string;
    password: string;
}, {
    access_token: string;
}> = async (req) => ({
    url: import.meta.env.VITE_ENTRY_POINT + '/auth/register',
    public: true,
    method: 'PUT',
    body: {
        username: req.username,
        password: req.password,
    }
})