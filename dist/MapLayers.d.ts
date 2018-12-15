import { CollisionGrid } from "./CollisionGrid";
import { GameLayer } from "./Enums";
import { SortableDraw2D, LayeredMapConfig } from "./Interfaces";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
export declare class MapLayers {
    private _container;
    private _layers;
    constructor();
    buildMap(config: LayeredMapConfig): CollisionGrid<Sprite>;
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(object: SortableDraw2D, layer?: GameLayer): boolean;
    removeAll(): void;
    private forEachScene;
    countChildren(): number;
    readonly scene: Scene;
}
