export interface IFile {
    name: string;
    data?: Blob;
    lastModified: Date;
}

export interface IFileShow {
    name: string;
    type: string;
    size: number;
    lastModified: number;
}

export type FileEditorMode = 'List' | 'Kanban';
