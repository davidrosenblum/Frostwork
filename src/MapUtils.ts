import { CollisionGrid } from "./CollisionGrid";
import { MapConfig, LayeredMapConfig, LayeredMapLayerConfig, GeneratedMapData } from "./Interfaces";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
import { BoundingBox } from "./BoundingBox";

export class MapUtils{
    public static buildGrid(config:MapConfig):GeneratedMapData{
        let { tileLayout, tileTypes, tileSize } = config;

        let rows:number = tileLayout[0].length;
        let cols:number = tileLayout.length;

        let collisionGrid:CollisionGrid<Sprite> = new CollisionGrid<Sprite>(rows, cols, tileSize);

        for(let row:number = 0; row < tileLayout.length; row++){
            for(let col:number = 0; col < tileLayout[row].length; col++){

                let typeID:number = tileLayout[row][col] || -1;
                let type:(typeof Sprite) = tileTypes[typeID] || null;

                if(type){
                    let tile:Sprite = new type();

                    tile.x = col * tileSize;
                    tile.y = row * tileSize;

                    if(tile.height > tileSize){
                        tile.y -= (tile.height - tileSize);
                    }

                    collisionGrid.storeObjectAt(tile, row, col);

                    if(config.scene){
                        config.scene.addChild(tile);   
                    }
                }
            }
        }

        let mapBounds:BoundingBox = new BoundingBox(0, 0, rows * tileSize, cols * tileSize);

        return {collisionGrid, mapBounds};
    }

    public static buildLayerMap(config:LayeredMapConfig, backgroundScene:Scene, midgroundScene:Scene, foregroundScene:Scene):GeneratedMapData{
        let collisionGrid:CollisionGrid<Sprite> = null;
        let mapBounds:BoundingBox = null;

        let scenes:Scene[] = [backgroundScene, midgroundScene, foregroundScene];

        let layerConfigs:LayeredMapLayerConfig[] = [config.background || null, config.midground || null, config.foreground || null];

        layerConfigs.forEach((layerConfig, index) => {
            if(layerConfig){
                let cfg:MapConfig = {
                    tileLayout: layerConfig.tileLayout,
                    tileTypes:  layerConfig.tileTypes,
                    tileSize:   config.tileSize,
                    scene:      index in scenes ? scenes[index] : null
                };
    
                let mapData:GeneratedMapData = MapUtils.buildGrid(cfg);
    
                if(layerConfig === config.midground){
                    collisionGrid = mapData.collisionGrid;
                    mapBounds = mapData.mapBounds;
                }
            }
        });

        return {collisionGrid, mapBounds};
    }
}