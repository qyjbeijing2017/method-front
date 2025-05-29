import Dexie, { type EntityTable } from "dexie";
import { methodDB } from "../store/db";
import { v4 } from "uuid";

interface IUpdateFilePart {
    id: string
    fileId: string
    blob: Blob
}

interface IUpdateFile {
    id: string
    taskId: string
    name: string
    size: number
}

interface IUpdateTask {
    id: string
    name: string
    newName: string
    description: string
    createdAt: Date
}

export interface UpdateTask {
    name: string
    newName?: string
    description?: string
    files: File[]
}

class UpdateTaskManager {
    readonly partSize = parseInt(import.meta.env.VITE_FILE_PART_SIZE, 10) || 5 * 1024 * 1024; // Default to 5MB if not set
    readonly db = methodDB as Dexie & {
        updateTasks: EntityTable<IUpdateTask, 'id'>;
        updateFiles: EntityTable<IUpdateFile, 'id'>;
        updateFileParts: EntityTable<IUpdateFilePart, 'id'>;
    }

    readonly tasks: IUpdateTask[] = [];

    constructor() {
        this.db.version(1).stores({
            updateTasks: '++id, name, newName, description, createdAt',
            updateFiles: '++id, taskId, name, size',
            updateFileParts: '++id, fileId'
        });
    }

    async addUpdateTask(task: UpdateTask): Promise<IUpdateTask> {
        const newTask: IUpdateTask = {
            id: v4(),
            name: task.name,
            newName: task.newName || '',
            description: task.description || '',
            createdAt: new Date()
        };

        if (!task.files || task.files.length === 0) {
            throw new Error("No files provided for the update task.");
        }

        for (const file of task.files) { 
            const newFile: IUpdateFile = {
                id: v4(),
                taskId: newTask.id,
                name: file.name,
                size: file.size
            };
            const buffer = await file.arrayBuffer();
            let offset = 0;
            while (buffer.byteLength > offset) {
                const part = buffer.slice(offset, offset + this.partSize);
                const newPart: IUpdateFilePart = {
                    id: v4(),
                    fileId: newFile.id,
                    blob: new Blob([part], { type: file.type })
                };
                await this.db.updateFileParts.add(newPart);
                offset += this.partSize;
            }
            await this.db.updateFiles.add(newFile);
        }

        await this.db.updateTasks.add(newTask);
        this.tasks.push(newTask);
        return newTask;
    }

    
}

export const updateTaskManager = new UpdateTaskManager();