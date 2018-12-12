import { FWEvent } from "./Interfaces";
export declare class EventEmitter {
    private _eventListeners;
    constructor();
    emit(eventType: string | FWEvent): boolean;
    on(eventType: string, listener: (evt: FWEvent) => any): void;
    off(eventType: string, listener: (evt: FWEvent) => any): boolean;
    removeListeners(eventType: string): boolean;
    removeAllListeners(): void;
    willTrigger(eventType: string): boolean;
}
