import { GameLayer } from "./Enums";
import { SortableDraw2D, LayeredMapConfig, GeneratedMapData } from "./Interfaces";
import { Scene } from "./Scene";
export declare class MapLayers {
    private _container;
    private _layers;
    constructor();
    buildMap(config: LayeredMapConfig): GeneratedMapData;
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(object: SortableDraw2D, layer?: GameLayer): boolean;
    removeAll(): void;
    private forEachScene;
    depthSort(): void;
    countChildren(): number;
    readonly scene: Scene;
}
