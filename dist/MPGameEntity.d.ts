import { GameEntity, GameEntityFacing } from "./GameEntity";
export interface GameEntityData {
    x?: number;
    y?: number;
    facing?: GameEntityFacing;
    anim?: string;
    moveSpeed?: number;
    objectID: string;
    teamID?: string;
}
export declare class MPGameEntity extends GameEntity {
    private _objectID;
    private _teamID;
    constructor(image?: string, width?: number, height?: number, x?: number, y?: number, objectID?: string, teamID?: string);
    applyUpdate(update: GameEntityData): void;
    getData(): GameEntityData;
    readonly objectID: string;
    readonly teamID: string;
    toString(): string;
}
