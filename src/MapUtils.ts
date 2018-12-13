import { CollisionGrid } from "./CollisionGrid";
import { MapConfig } from "./Interfaces";
import { Sprite } from "./Sprite";

export class MapUtils{
    public static buildGrid(config:MapConfig):CollisionGrid<Sprite>{
        let { tileLayout, tileTypes, tileSize } = config;

        let rows:number = tileLayout[0].length;
        let cols:number = tileLayout.length;

        let grid:CollisionGrid<Sprite> = new CollisionGrid<Sprite>(rows, cols, tileSize);

        tileLayout.forEach((row, y) => {
            row.forEach((col, x) => {
                let typeID:number = tileLayout[y][x] || -1;
                let type:(typeof Sprite) = tileTypes[typeID] || null;

                if(type){
                    let tile:Sprite = new type();

                    tile.x = x * tileSize;
                    tile.y = y * tileSize;

                    if(tile.height > tileSize){
                        tile.y -= (tile.height - tileSize);
                    }

                    grid.storeObjectAt(tile, x, y);
                    config.scene.addChild(tile);
                }
            });
        });

        return grid;
    }
}