import { CollisionGrid } from "./CollisionGrid";
import { MapConfig, GameMapConfig } from "./Interfaces";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
export declare class MapUtils {
    static buildGrid(config: MapConfig): CollisionGrid<Sprite>;
    static buildLayerMap(config: GameMapConfig, backgroundScene: Scene, midgroundScene: Scene, foregroundScene: Scene): CollisionGrid<Sprite>;
}
