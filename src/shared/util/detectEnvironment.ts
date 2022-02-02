export enum Environment {
    NODE = 0,
    BROWSER = 1,
}

export function detectEnvironment() {
    // assume that "process" is only defined if this code is running on Node
    return typeof process === "object" ? Environment.NODE : Environment.BROWSER;
}
