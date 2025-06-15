import type { HttpService } from './http-request'

export const createMethodService: HttpService<{
    name: string;
    description?: string;
}, void> = async ({ name, description }) => ({
    url: import.meta.env.VITE_ENTRY_POINT + `/method/${name}`,
    method: 'PUT',
    body: {
        description,
    },
})