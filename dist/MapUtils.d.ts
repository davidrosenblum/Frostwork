import { CollisionGrid } from "./CollisionGrid";
import { MapConfig } from "./Interfaces";
import { Sprite } from "./Sprite";
export declare class MapUtils {
    static buildGrid(config: MapConfig): CollisionGrid<Sprite>;
}
