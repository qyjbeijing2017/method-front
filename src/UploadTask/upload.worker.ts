import { expose } from "comlink";
import type { UploadingData } from "../store/db";

async function toUploadingData<T extends Record<string, any>>(data: T): Promise<UploadingData<T>> {
    const uploadingData: UploadingData<T> = {
        files: [],
        meta: data
    }
    for (const key in data) {
        const val = data[key] as any;
        if (val instanceof Blob) {
        }
    }
    return uploadingData;
}

expose({

})