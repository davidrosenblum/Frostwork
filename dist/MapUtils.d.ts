import { CollisionGrid } from "./CollisionGrid";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
import { BoundingBox } from "./BoundingBox";
export interface MapConfig {
    tileLayout: number[][];
    tileTypes: (typeof Sprite)[];
    tileSize: number;
    scene?: Scene;
    offsetX?: number;
    offsetY?: number;
}
export interface LayeredMapLayerConfig {
    tileLayout: number[][];
    tileTypes: (typeof Sprite)[];
    offsetX?: number;
    offsetY?: number;
}
export interface LayeredMapConfig {
    tileSize: number;
    background?: LayeredMapLayerConfig;
    midground?: LayeredMapLayerConfig;
    foreground?: LayeredMapLayerConfig;
}
export interface GeneratedMapData {
    collisionGrid: CollisionGrid<Sprite>;
    mapBounds: BoundingBox;
}
export declare class MapUtils {
    static buildGrid(config: MapConfig): GeneratedMapData;
    static buildLayerMap(config: LayeredMapConfig, backgroundScene: Scene, midgroundScene: Scene, foregroundScene: Scene): GeneratedMapData;
}
