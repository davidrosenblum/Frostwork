import { CollisionGrid } from "./CollisionGrid";
import { MapConfig, LayeredMapConfig } from "./Interfaces";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
export declare class MapUtils {
    static buildGrid(config: MapConfig): CollisionGrid<Sprite>;
    static buildLayerMap(config: LayeredMapConfig, backgroundScene: Scene, midgroundScene: Scene, foregroundScene: Scene): CollisionGrid<Sprite>;
}
