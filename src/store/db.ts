import Dexie, { type EntityTable } from 'dexie';

export const methodDB = new Dexie("MethodDB") as Dexie & {
    new_method: EntityTable<NewMethod, 'id'>;
}

export interface NewMethod {
    id: number;
    name?: string;
    icon?: Blob;
    description?: string;
    files: { id: number, name: string }[];
}

methodDB.version(1).stores({
    new_method: "++id",
});