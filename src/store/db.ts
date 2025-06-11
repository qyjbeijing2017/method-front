import Dexie, { type EntityTable } from 'dexie';
export const methodDB = new Dexie("MethodDB") as Dexie & {
    new_method: EntityTable<NewMethod, 'username'>;
}

export interface NewMethod {
    username: string;
    name?: string;
    icon?: Blob;
    description?: string;
    files?: File;
}

methodDB.version(1).stores({
    new_method: "++username",
});