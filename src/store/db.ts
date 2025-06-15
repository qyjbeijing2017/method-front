import Dexie, { type EntityTable } from 'dexie';

export interface NewMethod {
    username: string;
    name?: string;
    version?: string;
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

export interface UploadingFile {
    name: string;
    uploadId?: string;
    parts: {
        id: number;
        etag?: string;
        size: number;
    }[];
}

export interface UploadingData<T extends Record<string, any> = Record<string, any>> {
    files: UploadingFile[];
    meta: { [K in keyof T]: T[K] extends Blob ? string : T[K] };
}

export interface UploadTask<T extends Record<string, any> = Record<string, any>> {
    id: number;
    username: string;
    type: UploadType;
    date: Date;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    error?: string;
    data?: T | UploadingData<T>;
}

export const getProgress = (task: UploadTask): number => {
    if (task.status === 'completed') return 100;
    if (task.status === 'failed') return 0;
    if (task.status === 'pending') return 0;
    let uploadedSize = 0;
    const totalSize = (task.data as UploadingData)?.files.reduce((sum, file) => {
        return sum + file.parts.reduce((partSum, part) => {
            if (part.etag) {
                uploadedSize += part.size;
            }
            return partSum + part.size
        }, 0);
    }, 0) || 0;
    return uploadedSize / totalSize;
}

export const methodDB = new Dexie("MethodDB") as Dexie & {
    new_methods: EntityTable<NewMethod, 'username'>;
    upload_tasks: EntityTable<UploadTask<any>, 'id'>;
    upload_file_parts: EntityTable<UploadFilePart, 'id'>;
}

methodDB.version(1).stores({
    new_methods: "++username",
    upload_tasks: "++id, username, type, date, status",
    upload_file_parts: "++id"
});