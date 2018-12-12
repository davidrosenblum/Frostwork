import { CollisionObject, Point } from "./Interfaces";

export class CollisionGrid<T extends CollisionObject<T>>{
    private _grid:T[][];
    private _tileSize:number;

    constructor(rows:number, cols:number, tileSize:number){
        this._tileSize = tileSize;

        this._grid = new Array<T[]>(rows).fill(new Array<T>(cols));
    }

    public checkInBounds(row:number, col:number):boolean{
        return (row >= 0 && row < this._grid[0].length) &&
            (col >= 0 && col < this._grid.length);
    }

    public storeObjectAt(object:T, row:number, col:number):void{
        if(this.checkInBounds(row, col)){
            this._grid[row][col] = object;
        }
    }

    public getObjectAt(row:number, col:number):T{
        if(this.checkInBounds(row, col)){
            return this._grid[row][col] || null;
        }
        return null;
    }

    public getObjectAtPoint(point:Point):T{
        let x:number = Math.round(point.x / this._tileSize);
        let y:number = Math.round(point.y / this._tileSize);

        return this.getObjectAt(x, y);  // checks bounds
    }
}