import { expose } from "comlink";
import { methodDB, type NewMethod, type UploadingData, type UploadingFile, type UploadTask } from "../store/db";
import { v4 } from "uuid";
import { singleton } from "../utils/singleton";

const UPLOAD_CHUNK_SIZE = parseInt(import.meta.env.VITE_FILE_PART_SIZE, 10) || 10 * 1024 * 1024; // Default to 5MB if not set



export class UploadManager {

    readonly _finishedCallbacks: {
        [key: string]: (task: UploadTask) => void | Promise<void>;
    } = {
        method: async (task) => {
            const data = task.data as UploadingData<NewMethod>;
            fetch(`${import.meta.env.VITE_ENTRY_POINT}/method`, {
                method: 'POST',
            })
            
        },
    };

    constructor() {
        methodDB.upload_tasks.hook('creating', this.handleCreateing);
    }

    async toUploadingData<T extends Record<string, any>>(data: T): Promise<UploadingData<T>> {
        const uploadingData: UploadingData<T> = {
            files: [],
            meta: data
        }
        for (const key in data) {
            const val = data[key] as any;
            if (val instanceof Blob) {
                let seek = 0;

                const file: UploadingFile = {
                    name: `.${v4()}.${val.type}`,
                    parts: [],
                }

                while (seek < val.size) {
                    const size = Math.min(UPLOAD_CHUNK_SIZE, val.size - seek);
                    const part = val.slice(seek, seek + size);
                    const id = await methodDB.upload_file_parts.add({
                        blob: part,
                    })
                    file.parts.push({
                        id: id,
                        size: size,
                    });
                    seek += size;
                }
            }
        }
        return uploadingData;
    }

    private readonly _queue: UploadTask<any>[] = [];
    private handleCreateing = (_key: number, object: UploadTask<any>) => {
        this._queue.push(object);
        this.start();
    }

    private _isRunning = false;
    private _token: string | null = null;

    loop = async () => {
        if (!this._isRunning || this._queue.length === 0) {
            this._isRunning = false;
            return;
        }
        const task = this._queue[0];
        try {
            if (task.status === 'pending') {
                task.data = await this.toUploadingData(task.data as Record<string, any>);
                task.status = 'uploading';
                await methodDB.upload_tasks.update(task.id, {
                    status: 'uploading',
                    data: task.data,
                });
            }
            for (let i = 0; i < task.data.files.length; i++) {
                const file: UploadingFile = task.data.files[i];
                if (!file.uploadId) {
                    const resp = await fetch(`${import.meta.env.VITE_ENTRY_POINT}/file/${file.name}/multipart`, {
                        method: 'POST',
                        headers: {
                            ['Authorization']: `Bearer ${this._token}`,
                        },
                    })
                    if (!resp.ok) {
                        throw new Error(`Failed to create multipart upload for file ${file.name}`);
                    }
                    const data = await resp.json() as { uploadId: string };
                    file.uploadId = data.uploadId;
                    await methodDB.upload_tasks.update(task.id, {
                        data: task.data,
                    });
                }
                for (let j = 0; j < file.parts.length; j++) {
                    const part = file.parts[j];
                    if (part.etag) continue; // already uploaded
                    const data = await methodDB.upload_file_parts.get(part.id);
                    if (!data) {
                        throw new Error(`File part with id ${part.id} not found`);
                    }
                    const formData = new FormData();
                    formData.append('file', data.blob, file.name);
                    const resp = await fetch(`${import.meta.env.VITE_ENTRY_POINT}/file/${file.name}/part/${file.uploadId}/${j + 1}`, {
                        method: 'PUT',
                        headers: {
                            ['Authorization']: `Bearer ${this._token}`,
                            ['Content-Type']: 'multipart/form-data',
                        },
                        body: formData,
                    });
                    if (!resp.ok) {
                        throw new Error(`Failed to upload part ${j + 1} of file ${file.name}`);
                    }
                    const responseData = await resp.json() as {
                        ETag: string;
                        PartNumber: number;
                    }
                    part.etag = responseData.ETag;
                    await methodDB.transaction('rw', methodDB.upload_tasks, methodDB.upload_file_parts, async () => {
                        await methodDB.upload_tasks.update(task.id, {
                            data: task.data,
                        });
                        await methodDB.upload_file_parts.delete(part.id); // Remove part after upload
                    })
                }
                const resp = await fetch(`${import.meta.env.VITE_ENTRY_POINT}/file/${file.name}/complete/${file.uploadId}`, {
                    method: 'POST',
                    headers: {
                        ['Authorization']: `Bearer ${this._token}`,
                    },
                    body: JSON.stringify({
                        parts: file.parts.map((part, index) => ({
                            etag: part.etag,
                            partNumber: index + 1,
                        })),
                    }),
                });
                if (!resp.ok) {
                    throw new Error(`Failed to complete multipart upload for file ${file.name}`);
                }
            }

            const callBack = this._finishedCallbacks[task.id];
            if (!callBack) {
                throw new Error(`No callback found for task ${task.id}`);
            }
            await callBack(task);
            await methodDB.upload_tasks.update(task.id, {
                status: 'completed',
                data: undefined, // Clear data after upload
            });
            this._queue.shift(); // Remove the task from the queue
        } catch (error) {
            console.error("Upload task failed:", error);
            task.status = 'failed';
            task.error = (error as Error).message;
            await methodDB.upload_tasks.update(task.id, {
                status: 'failed',
                error: task.error,
            });
        }
        setTimeout(this.loop, 0);
    }

    start() {
        if (this._isRunning) return;
        this._isRunning = true;
        this.loop();
    }

    async init(username: string, token: string) {
        await this.exit();
        this._token = token;
        const tasks = await methodDB.upload_tasks
            .where("username")
            .equals(username)
            .and(task => task.status === 'pending' || task.status === 'uploading')
            .toArray();
        tasks.sort((a, b) => a.date.getTime() - b.date.getTime());
        for (const task of tasks) {
            this._queue.push(task);
        }
        this.start();
    }

    async exit() {
        this._isRunning = false;
        this._queue.length = 0;
        this._token = null;
    }
}

expose(singleton(UploadManager))