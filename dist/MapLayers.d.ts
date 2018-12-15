import { GameLayer } from "./Enums";
import { LayeredMapConfig, GeneratedMapData } from "./Interfaces";
import { Object2D } from "./Object2D";
import { Scene } from "./Scene";
export declare class MapLayers {
    private _container;
    private _layers;
    private _mapGrid;
    constructor();
    toggleMapGrid(): void;
    private createMapGrid;
    buildMap(config: LayeredMapConfig): GeneratedMapData;
    addAt(object: Object2D, col: number, row: number, layer?: GameLayer): boolean;
    add(object: Object2D, layer?: GameLayer): boolean;
    remove(object: Object2D, layer?: GameLayer): boolean;
    removeAll(): void;
    private forEachScene;
    depthSort(): void;
    countChildren(): number;
    readonly scene: Scene;
}
