import Dexie, { type EntityTable } from 'dexie';
import type { IFile } from '../Components/FilesEditor';

export const methodDB = new Dexie("MethodDB") as Dexie & {
    new_method: EntityTable<NewMethod, 'id'>;
}

export interface NewMethod {
    id: number;
    name: string;
    icon: Blob | null;
    description: string;
    files: IFile[];
}

methodDB.version(1).stores({
    new_method: "++id",
});