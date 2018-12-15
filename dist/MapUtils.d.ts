import { MapConfig, LayeredMapConfig, GeneratedMapData } from "./Interfaces";
import { Scene } from "./Scene";
export declare class MapUtils {
    static buildGrid(config: MapConfig): GeneratedMapData;
    static buildLayerMap(config: LayeredMapConfig, backgroundScene: Scene, midgroundScene: Scene, foregroundScene: Scene): GeneratedMapData;
}
