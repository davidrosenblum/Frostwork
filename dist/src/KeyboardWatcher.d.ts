export declare class KeyboardWatcher {
    private _keys;
    private _numKeys;
    constructor(element?: HTMLElement);
    private handleKeyUp;
    private handleKeyDown;
    forceKeyUp(key: string): void;
    forceKeyDown(key: string): void;
    isKeyUp(key: string): boolean;
    isKeyDown(key: string): boolean;
    anyKeysUp(keys: string[]): boolean;
    anyKeysDown(keys: string[]): boolean;
    allKeysUp(keys: string[]): boolean;
    allKeysDown(keys: string[]): boolean;
    readonly numKeys: number;
}
