import { CollisionGrid } from "./CollisionGrid";
import { MapConfig } from "./Interfaces";
import { Sprite } from "./Sprite";

export class MapUtils{
    public static buildGrid(config:MapConfig):CollisionGrid<Sprite>{
        let { tileLayout, tileTypes, tileSize } = config;

        let rows:number = tileLayout[0].length;
        let cols:number = tileLayout.length;

        let grid:CollisionGrid<Sprite> = new CollisionGrid<Sprite>(rows, cols, tileSize);

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

                    grid.storeObjectAt(tile, row, col);

                    if(config.scene){
                        config.scene.addChild(tile);   
                    }
                }
            }
        }

        console.log(grid);

        return grid;
    }
}