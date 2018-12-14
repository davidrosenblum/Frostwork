import { BoundingBox } from "./BoundingBox";
import { GameLayer } from "./Enums";
import { EventEmitter } from "./EventEmitter";
import { GameEntity } from "./GameEntity";
import { KeyboardWatcher } from "./KeyboardWatcher";
import { SortableDraw2D, GameMapConfig } from "./Interfaces";
export declare class FrostworkGame extends EventEmitter {
    private _renderer;
    private _layers;
    private _keyWatcher;
    private _playerMovement;
    private _clock;
    private _collisionGrid;
    private _bounds;
    private _scroller;
    private _player;
    private _initialized;
    constructor(width?: number, height?: number);
    private update;
    init(): void;
    start(): void;
    togglePause(): void;
    stop(): void;
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(target: SortableDraw2D, layer?: GameLayer): boolean;
    setMap(config: GameMapConfig, autoSetMapBounds?: boolean): void;
    setMapBounds(x?: number, y?: number, width?: number, height?: number): void;
    removeAllChildren(): void;
    resize(width: number, height: number): void;
    injectInto(element: HTMLElement | string): void;
    player: GameEntity;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly canvas: HTMLCanvasElement;
    readonly keyWatcher: KeyboardWatcher;
    readonly mapBounds: BoundingBox;
    readonly isInitialized: boolean;
}
