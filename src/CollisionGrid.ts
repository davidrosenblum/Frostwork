import { Point } from "./Interfaces";
import { Object2D } from "./Object2D";

export class CollisionGrid<T extends Object2D>{
    private _grid:T[][];
    private _tileSize:number;

    constructor(rows:number, cols:number, tileSize:number){
        this._tileSize = tileSize;

        //this._grid = new Array<T[]>(rows).fill(new Array<T>(cols).fill(null)); << errors?
        this._grid = new Array<T[]>(rows);
        for(let i:number = 0; i < cols; i++){
            this._grid[i] = new Array<T>(cols);
        }
    }

    public checkInBounds(col:number, row:number):boolean{
        return (row >= 0 && row < this._grid[0].length) &&
            (col >= 0 && col < this._grid.length);
    }

    public storeObjectAt(object:T, col:number, row:number):void{
        if(this.checkInBounds(col, row)){
            this._grid[row][col] = object;
        }
    }

    public getObjectAt(col:number, row:number):T{
        if(this.checkInBounds(row, col)){
            return this._grid[row][col] || null;
        }
        return null;
    }

    public getObjectAtPoint(point:Point):T{
        return this.getObjectAt(point.x, point.y);
    }

    public getObjectAtPixels(x:number, y:number):T{
        let row:number = Math.round(x / this._tileSize);
        let col:number = Math.round(y / this._tileSize);

        return this.getObjectAt(row, col);  // checks bounds
    }

    public getObjectAtPixelsPoint(point:Point):T{
        return this.getObjectAtPixels(point.x, point.y);  // checks bounds
    }

    public getObjectAtTarget(target:Object2D):T{
        let pt:Point = target.getCoords(this._tileSize);
        return this.getObjectAtPoint(pt);
    }
}