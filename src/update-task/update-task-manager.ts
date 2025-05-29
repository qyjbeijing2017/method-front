import Dexie, { type EntityTable } from "dexie";
import { methodDB } from "../store/db";
import { v4 } from "uuid";
import { create } from "zustand";

interface IUpdateFilePart {
    id: string
    fileId: string
    partNumber: number
    size: number
    etag?: string
}

interface IUpdateFileBlob {
    id: string
    blob: Blob
}

interface IUpdateFile {
    id: string
    taskId: string
    name: string
    size: number
    uploadId?: string
    status: 'pending' | 'uploading' | 'completed'
}

interface IUpdateTask {
    id: string
    name: string
    newName?: string
    description?: string
    icon?: Blob
    createdAt: Date
}

export interface UpdateTask {
    name: string
    newName?: string
    description?: string
    icon?: File
    files: File[]
}

export interface UpdatingTask {
    task: IUpdateTask
    completed: number
    total: number
    status: 'pending' | 'uploading' | 'completed'
    paddingParts: IUpdateFilePart[]
}

export interface TasksState {
    tasks: UpdatingTask[]
    addTask: (task: UpdatingTask) => void
    removeTask: (taskId: string) => void
}

class UpdateTaskManager {
    readonly partSize = parseInt(import.meta.env.VITE_FILE_PART_SIZE, 10) || 5 * 1024 * 1024; // Default to 5MB if not set
    readonly db = methodDB as Dexie & {
        updateTasks: EntityTable<IUpdateTask, 'id'>;
        updateFiles: EntityTable<IUpdateFile, 'id'>;
        updateFileParts: EntityTable<IUpdateFilePart, 'id'>;
        updateFileBlobs: EntityTable<IUpdateFileBlob, 'id'>;
    }

    readonly tasks: UpdatingTask[] = [];

    readonly useTasks = create<TasksState>(set=>({
        get tasks() {
            return this.tasks;
        },
        addTask(task: UpdatingTask) {
            this.tasks.push(task);
            set({ tasks: this.tasks });
        },
        removeTask(taskId: string) {
            const index = this.tasks.findIndex(t => t.task.id === taskId);
            if (index !== -1) {
                this.tasks.splice(index, 1);
                set({ tasks: this.tasks });
            }
        }
    })); 

    constructor() {
        this.db.version(1).stores({
            updateTasks: '++id, name, newName, description, icon createdAt',
            updateFiles: '++id, taskId, name, size',
            updateFileParts: '++id, fileId, partNumber, size, etag',
            IUpdateFileBlobs: '++id, blob'
        });
    }

    async addUpdateTask(task: UpdateTask): Promise<IUpdateTask> {

        const newTask: IUpdateTask = {
            id: v4(),
            name: task.name,
            newName: task.newName,
            description: task.description,
            icon: task.icon ? await task.icon.arrayBuffer().then(buf => new Blob([buf], { type: task.icon!.type })) : undefined,
            createdAt: new Date()
        };

        const updatingTask: UpdatingTask = {
            task: newTask,
            completed: 0,
            total: 0,
            status: 'pending',
            paddingParts: []
        }

        for (const file of task.files) {
            const newFile: IUpdateFile = {
                id: v4(),
                taskId: newTask.id,
                name: file.name,
                size: file.size,
                status: 'pending'
            };

            let offset = 0;
            let partNumber = 0;
            while (offset < file.size) {
                const partBlob = file.slice(offset, Math.min(offset + this.partSize, file.size));
                const part: IUpdateFilePart = {
                    id: v4(),
                    fileId: newFile.id,
                    size: partBlob.size,
                    partNumber: ++partNumber, // start part numbers from 1
                };
                const blob: IUpdateFileBlob = {
                    id: part.id,
                    blob: partBlob
                };

                await this.db.updateFileParts.add(part);
                await this.db.updateFileBlobs.add(blob);
                updatingTask.paddingParts.push(part);
                updatingTask.total += partBlob.size;
                offset += part.size;
            }

            await this.db.updateFiles.add(newFile);
        }

        await this.db.updateTasks.add(newTask);

        this.tasks.push(updatingTask);

        return newTask;
    }

    private _running = false;
    get running() {
        return this._running;
    }

    async start() {
        if (this._running) {
            return;
        }
        this._running = true;
        while (this.tasks.length > 0) {
            const updateTask = this.tasks[0];
            const files = await this.db.updateFiles.where('taskId').equals(updateTask.task.id).toArray();

        }
        this._running = false; // Reset running state after processing
    }
}

export const updateTaskManager = new UpdateTaskManager();