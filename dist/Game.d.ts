import { GameLayer } from "./Enums";
import { EventEmitter } from "./EventEmitter";
import { SortableDraw2D, GameMapConfig } from "./Interfaces";
export declare class Game extends EventEmitter {
    private _renderer;
    private _multiplayerObjects;
    private _layers;
    private _collisionGrid;
    private _started;
    constructor(width?: number, height?: number);
    start(): void;
    togglePause(): void;
    stop(): void;
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(target: SortableDraw2D, layer?: GameLayer): boolean;
    setMap(config: GameMapConfig): void;
    removeAllChildren(): void;
    resize(width: number, height: number): void;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly alreadyStarted: boolean;
}
