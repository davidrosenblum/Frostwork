import { FrostworkGame } from "./FrostworkGame";
import { GameLayer } from "./Enums";
import { GameEntityData, SortableDraw2D } from "./Interfaces";
export declare class FrostworkMPGame extends FrostworkGame {
    private _multiplayerObjects;
    private _player1;
    constructor(width?: number, height?: number);
    stop(): void;
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(target: SortableDraw2D, layer?: GameLayer): boolean;
    updateObject(data: GameEntityData): boolean;
}
