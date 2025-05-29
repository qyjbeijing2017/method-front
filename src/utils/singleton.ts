const singletonMap = new Map<new (...args: unknown[]) => unknown, unknown>();

export function singleton<T extends new (...args: unknown[]) => unknown>(ctor: T, ...args: ConstructorParameters<T>): T {
    if (!singletonMap.has(ctor)) {
        const instance = new ctor(...args);
        singletonMap.set(ctor, instance);
    }
    return singletonMap.get(ctor) as T;
}

export function clearSingleton<T extends new (...args: unknown[]) => unknown>(ctor: T): void {
    singletonMap.delete(ctor);
}