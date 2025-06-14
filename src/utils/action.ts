export class Action<T = void> {
    private readonly _listener: ((data: T) => void)[] = [];
    addListener(listener: (data: T) => void): void {
        this._listener.push(listener);
    }
    removeListener(listener: (data: T) => void): void {
        const index = this._listener.indexOf(listener);
        if (index !== -1) {
            this._listener.splice(index, 1);
        }
    }
    invoke(data: T): void {
        for (const listener of this._listener) {
            listener(data);
        }
    }
    clear(): void {
        this._listener.length = 0;
    }
}