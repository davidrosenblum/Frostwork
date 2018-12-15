import { GameEntityData } from "./Interfaces";
import { MPGameEntity } from "./MPGameEntity";
export declare class MPEntityStorage {
    private _objects;
    private _numObjects;
    constructor();
    addObject(object: MPGameEntity): boolean;
    removeObject(object: MPGameEntity): boolean;
    updateObject(data: GameEntityData): boolean;
    clear(): void;
    containsObject(object: MPGameEntity | string): boolean;
    getObject(objectID: string): MPGameEntity;
    readonly numObjects: number;
}
