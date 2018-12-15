import { GameLayer } from "./Enums";
import { SortableDraw2D } from "./Interfaces";
import { Scene } from "./Scene";
export declare class MapLayersContainer {
    private _container;
    private _layers;
    constructor();
    add(object: SortableDraw2D, layer?: GameLayer): boolean;
    remove(object: SortableDraw2D, layer?: GameLayer): boolean;
    removeAll(): void;
    private forEachScene;
    countChildren(): number;
    readonly scene: Scene;
}
