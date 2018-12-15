export declare class KeyboardWatcher {
    private _keys;
    private _numKeys;
    private _onKeys;
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
    onKey(key: string, listener: () => any): void;
    private emitOnKey;
    readonly numKeys: number;
}
