import Dexie, { type EntityTable } from 'dexie';

export interface NewMethod {
    username: string;
    name?: string;
    icon?: Blob;
    description?: string;
    files?: File;
    executable?: string;
}

export type UploadType = 'method' | 'task';

export interface UploadFilePart {
    id: number;
    blob: Blob;
}

export type UploadingData<T extends Record<string, any> = Record<string, any>> = {
    files: {
        name: string;
        uploadId?: number;
        parts: {
            id: number;
            etag?: string;
            size: number;
        }[];
    }[];
    meta: { [K in keyof T]: T[K] extends Blob ? string : T[K] };
}

export interface UploadTask<T extends Record<string, any> = Record<string, any>> {
    id: number;
    username: string;
    type: UploadType;
    date: Date;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    data?: T | UploadingData<T>;
}

export const methodDB = new Dexie("MethodDB") as Dexie & {
    new_methods: EntityTable<NewMethod, 'username'>;
    upload_tasks: EntityTable<UploadTask<any>, 'id'>;
}

methodDB.version(1).stores({
    new_methods: "++username",
    upload_tasks: "++id, username, type, date, status",
    upload_file_parts: "++id"
});