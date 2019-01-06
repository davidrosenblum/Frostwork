import { GeneratedMapData, LayeredMapConfig } from "./MapUtils";
import { Object2D } from "./Object2D";
import { Sprite } from "./Sprite";
export declare const enum GameLayer {
    BACKGROUND = 1,
    MIDGROUND = 2,
    FOREGROUND = 3,
    HUD = 4
}
export declare class MapLayers {
    private _container;
    private _layers;
    private _mapGrid;
    constructor();
    toggleMapGrid(): void;
    private createMapGrid;
    buildMap(config: LayeredMapConfig): GeneratedMapData;
    addAt(object: Object2D, col: number, row: number, layer?: GameLayer): boolean;
    add(object: Object2D, layer?: GameLayer, depthSort?: boolean): boolean;
    remove(object: Object2D, layer?: GameLayer): boolean;
    removeAll(): void;
    private forEachScene;
    depthSort(): void;
    countChildren(): number;
    processClick(evt: MouseEvent): void;
    readonly mapSprite: Sprite;
}
